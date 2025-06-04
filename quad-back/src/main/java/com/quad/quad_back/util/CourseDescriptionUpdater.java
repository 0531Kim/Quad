package com.quad.quad_back.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.net.SocketTimeoutException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class CourseDescriptionUpdater {
    private static final Logger logger = LoggerFactory.getLogger(CourseDescriptionUpdater.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();
    
    private static final int CONNECTION_TIMEOUT = 30000; // 30 seconds
    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY = 2000; // 2 seconds
    
    private static final List<UrlSet> URL_SETS = Arrays.asList(
        // Semester 1 & 2 pages (0-63)
        new UrlSet(
            "https://courseoutline.auckland.ac.nz/dco/course/advanceSearch?advanceSearchText=&termCodeYear=125&termCodeTerm=3&facultyId=&organisationCode=&stage=&pageNumber=",
            0, 63
        )
        ,
        // Another set for semester 1 & 2 (0-61)
        new UrlSet(
            "https://courseoutline.auckland.ac.nz/dco/course/advanceSearch?advanceSearchText=&termCodeYear=125&termCodeTerm=5&facultyId=&organisationCode=&stage=&pageNumber=",
            0, 61
        )
        ,
        // Summer school pages (0-4)
        new UrlSet(
            "https://courseoutline.auckland.ac.nz/dco/course/advanceSearch?advanceSearchText=&termCodeYear=125&termCodeTerm=0&facultyId=&organisationCode=&stage=&pageNumber=",
            0, 4
        )
    );
    
    // Main method to run the scraper
    public void updateCourseDescriptions(String outputFilePath) {
        logger.info("Starting University of Auckland Course Scraper");
        Map<String, Course> courses = new ConcurrentHashMap<>();
        AtomicInteger totalPages = new AtomicInteger(0);
        
        // Process each URL set
        for (UrlSet urlSet : URL_SETS) {
            logger.info("Processing URL set: {} (pages {}-{})", 
                    urlSet.getBaseUrl(), urlSet.getStartPage(), urlSet.getEndPage());
            
            for (int pageNum = urlSet.getStartPage(); pageNum <= urlSet.getEndPage(); pageNum++) {
                String url = urlSet.getBaseUrl() + pageNum;
                logger.info("Scraping page {} of {}", pageNum, urlSet.getEndPage());
                totalPages.incrementAndGet();
                
                try {
                    // Fetch the page with retries
                    Document document = fetchPageWithRetry(url);
                    
                    if (document != null) {
                        // Process courses on this page
                        processCoursesOnPage(document, courses);
                        
                        // Add a small delay to avoid rate limiting
                        Thread.sleep(1000);
                    }
                } catch (Exception e) {
                    logger.error("Error processing page {}: {}", pageNum, e.getMessage());
                }
                
                // Save progress every 10 pages
                if (pageNum % 10 == 0) {
                    saveProgress(courses, outputFilePath + ".progress");
                }
            }
        }
        
        // Enrich course data with additional information
        logger.info("Enriching course data with additional information...");
        enrichCourseData(courses);
        
        // Validate and save final output
        List<Course> courseList = new ArrayList<>(courses.values());
        saveToJson(courseList, outputFilePath);
        logger.info("Scraped {} courses across {} pages and saved to {}", 
                courseList.size(), totalPages.get(), outputFilePath);
    }
    
    // Process all courses on a single page
    private void processCoursesOnPage(Document document, Map<String, Course> courses) {
        Elements courseCards = document.select(".course-card");
        
        for (Element card : courseCards) {
            Element courseCardDetails = card.selectFirst(".course-card-details");
            if (courseCardDetails == null) continue;
            
            // Extract course code and title
            Element codeElement = courseCardDetails.selectFirst(".course-code");
            
            if (codeElement == null) continue;
            
            String courseCode = codeElement.text().trim();
            String courseName = courseCode;
            
            // Get all mr-2 mb-3 divs (these contain different information)
            Elements infoElements = courseCardDetails.select(".mr-2.mb-3");
            if (infoElements.isEmpty()) continue;
            
            // First div with mr-2 mb-3 is the term information
            Element termElement = infoElements.first();
            String termInfo = termElement != null ? termElement.text().trim() : "";
            
            // Extract link from the button at the bottom
            Element linkElement = courseCardDetails.selectFirst("a.w3-btn");
            String link = linkElement != null ? linkElement.attr("href") : "";
            
            // Extract course prescription (description)
            Element prescriptionElement = courseCardDetails.selectFirst(".course-prescription");
            String description = "";
            
            // Extract requirements description (this should be added to the description)
            Element requirementElement = courseCardDetails.selectFirst(".requirement-description");
            if (requirementElement != null) {
                description = requirementElement.text().trim();
            }
            
            // Initialize course object if not exists
            Course course;
            if (!courses.containsKey(courseCode)) {
                course = new Course(
                    courseName, 0, 0, 0, "", "", "", description, 0, 0, 0
                );
                courses.put(courseCode, course);
            } else {
                course = courses.get(courseCode);
                // If we already have this course but not the description, update it
                if (course.getDescription().isEmpty() && !description.isEmpty()) {
                    course.setDescription(description);
                }
            }
            
            // Set semester flags and links based on term info
            if (termInfo.contains("Summer School")) {
                course.setSummer(1);
                if (!link.isEmpty()) {
                    course.setSummer_link(link);
                }
            } else if (termInfo.contains("Semester One")) {
                course.setSem1(1);
                if (!link.isEmpty()) {
                    course.setSem1_link(link);
                }
            } else if (termInfo.contains("Semester Two")) {
                course.setSem2(1);
                if (!link.isEmpty()) {
                    course.setSem2_link(link);
                }
            }
        }
    }
    
    // Fetch a page with retry mechanism
    private Document fetchPageWithRetry(String url) throws InterruptedException {
        int retries = 0;
        while (retries < MAX_RETRIES) {
            try {
                return Jsoup.connect(url)
                        .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
                        .timeout(CONNECTION_TIMEOUT)
                        .get();
            } catch (SocketTimeoutException e) {
                retries++;
                logger.warn("Connection timeout, retry {} of {}", retries, MAX_RETRIES);
                if (retries >= MAX_RETRIES) {
                    logger.error("Failed to connect to {} after {} retries", url, MAX_RETRIES);
                    return null;
                }
                Thread.sleep(RETRY_DELAY * retries); // Exponential backoff
            } catch (IOException e) {
                logger.error("Error fetching page {}: {}", url, e.getMessage());
                return null;
            }
        }
        return null;
    }


    
    // Enrich course data with additional information
    // private void enrichCourseData(Map<String, Course> courses) {
    //     courses.values().parallelStream().forEach(course -> {
    //         List<String> links = new ArrayList<>();
    //         if (!course.getSem1_link().isEmpty()) links.add(course.getSem1_link());
    //         if (!course.getSem2_link().isEmpty()) links.add(course.getSem2_link());
    //         if (!course.getSummer_link().isEmpty()) links.add(course.getSummer_link());
            
    //         if (!links.isEmpty()) {
    //             // Just visit the first available link
    //             String firstLink = links.get(0);
    //             logger.info("Visiting {} for course {}", firstLink, course.getCourseName().split(" - ")[0]);
                
    //             try {
    //                 Document document = fetchPageWithRetry(firstLink);
    //                 if (document != null) {
    //                     // Check for online or in-person delivery
    //                     Element deliveryElement = document.selectFirst(".delivery-info");
    //                     if (deliveryElement != null) {
    //                         String deliveryContent = deliveryElement.text();
    //                         course.setOnline(deliveryContent.contains("Online") ? 1 : 0);
    //                         course.setIn_person(deliveryContent.contains("In person") ? 1 : 0);
    //                     }
                        
    //                     // Check for exams
    //                     Element assessmentElement = document.selectFirst(".assessment-table");
    //                     if (assessmentElement != null) {
    //                         String assessmentContent = assessmentElement.text().toLowerCase();
    //                         course.setNoExam(!assessmentContent.contains("exam") ? 1 : 0);
    //                     }
    //                 }
                    
    //                 // Add a small delay to avoid hammering the server
    //                 Thread.sleep(500);
    //             } catch (Exception e) {
    //                 logger.error("Error enriching data for course {}: {}", 
    //                         course.getCourseName(), e.getMessage());
    //             }
    //         }
    //     });
    // }

    private void enrichCourseData(Map<String, Course> courses) {
        courses.values().parallelStream().forEach(course -> {
            List<String> links = new ArrayList<>();
            if (!course.getSem1_link().isEmpty()) links.add(course.getSem1_link());
            if (!course.getSem2_link().isEmpty()) links.add(course.getSem2_link());
            if (!course.getSummer_link().isEmpty()) links.add(course.getSummer_link());
            
            if (!links.isEmpty()) {
                // Just visit the first available link
                String firstLink = links.get(0);
                logger.info("Visiting {} for course {}", firstLink, course.getCourseName());
                
                try {
                    Document document = fetchPageWithRetry(firstLink);
                    if (document != null) {
                        // Check for online or in-person delivery
                        Element deliveryElement = document.selectFirst(".delivery-info");
                        if (deliveryElement != null) {
                            String deliveryContent = deliveryElement.text();
                            course.setOnline(deliveryContent.contains("Online") ? 1 : 0);
                            course.setIn_person(deliveryContent.contains("In person") ? 1 : 0);
                        }
                        
                        // Check for exams in the assessment table
                        Element assessmentTableDiv = document.selectFirst("#assessmentTypesTableDiv");
                        if (assessmentTableDiv != null) {
                            Elements assessmentNames = assessmentTableDiv.select(".assessment-name");
                            boolean hasExam = false;
                            
                            for (Element assessmentElement : assessmentNames) {
                                String assessmentText = assessmentElement.text().trim().toLowerCase();
                                if (assessmentText.contains("exam")) {
                                    hasExam = true;
                                    break;
                                }
                            }
                            
                            // If there's an exam, set noExam to 0, otherwise set it to 1
                            course.setNoExam(hasExam ? 0 : 1);
                            
                            // If we found an exam, set both online and in_person to 1
                            if (hasExam) {
                                course.setOnline(1);
                                course.setIn_person(1);
                            }
                        } else {
                            // If there's no assessment table, we assume there's no exam
                            course.setNoExam(1);
                        }
                    }
                    
                    // Add a small delay to avoid hammering the server
                    Thread.sleep(500);
                } catch (Exception e) {
                    logger.error("Error enriching data for course {}: {}", 
                            course.getCourseName(), e.getMessage());
                }
            }
        });
    }
    
    // Save progress to a JSON file
    private void saveProgress(Map<String, Course> courses, String filePath) {
        try {
            List<Course> courseList = new ArrayList<>(courses.values());
            saveToJson(courseList, filePath);
            logger.info("Progress saved: {} courses saved to {}", courseList.size(), filePath);
        } catch (Exception e) {
            logger.error("Error saving progress to {}: {}", filePath, e.getMessage());
        }
    }
    
    // Save courses to a JSON file
    private void saveToJson(List<Course> courses, String filePath) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(filePath), courses);
        } catch (IOException e) {
            logger.error("Error saving to JSON: {}", e.getMessage());
        }
    }
    
    // Helper class to represent a URL set
    private static class UrlSet {
        private final String baseUrl;
        private final int startPage;
        private final int endPage;
        
        public UrlSet(String baseUrl, int startPage, int endPage) {
            this.baseUrl = baseUrl;
            this.startPage = startPage;
            this.endPage = endPage;
        }
        
        public String getBaseUrl() {
            return baseUrl;
        }
        
        public int getStartPage() {
            return startPage;
        }
        
        public int getEndPage() {
            return endPage;
        }
    }
    
    // Course model class
    public static class Course {
        private String courseName;
        private int sem1;
        private int sem2;
        private int summer;
        private String sem1_link;
        private String sem2_link;
        private String summer_link;
        private String description;
        private int in_person;
        private int online;
        private int noExam;
        
        // Constructor
        public Course(String courseName, int sem1, int sem2, int summer, 
                     String sem1_link, String sem2_link, String summer_link, 
                     String description, int in_person, int online, int noExam) {
            this.courseName = courseName;
            this.sem1 = sem1;
            this.sem2 = sem2;
            this.summer = summer;
            this.sem1_link = sem1_link;
            this.sem2_link = sem2_link;
            this.summer_link = summer_link;
            this.description = description;
            this.in_person = in_person;
            this.online = online;
            this.noExam = noExam;
        }
        
        // Default constructor for Jackson
        public Course() {
        }
        
        // Getters and setters
        public String getCourseName() {
            return courseName;
        }
        
        public void setCourseName(String courseName) {
            this.courseName = courseName;
        }
        
        public int getSem1() {
            return sem1;
        }
        
        public void setSem1(int sem1) {
            this.sem1 = sem1;
        }
        
        public int getSem2() {
            return sem2;
        }
        
        public void setSem2(int sem2) {
            this.sem2 = sem2;
        }
        
        public int getSummer() {
            return summer;
        }
        
        public void setSummer(int summer) {
            this.summer = summer;
        }
        
        public String getSem1_link() {
            return sem1_link;
        }
        
        public void setSem1_link(String sem1_link) {
            this.sem1_link = sem1_link;
        }
        
        public String getSem2_link() {
            return sem2_link;
        }
        
        public void setSem2_link(String sem2_link) {
            this.sem2_link = sem2_link;
        }
        
        public String getSummer_link() {
            return summer_link;
        }
        
        public void setSummer_link(String summer_link) {
            this.summer_link = summer_link;
        }
        
        public String getDescription() {
            return description;
        }
        
        public void setDescription(String description) {
            this.description = description;
        }
        
        public int getIn_person() {
            return in_person;
        }
        
        public void setIn_person(int in_person) {
            this.in_person = in_person;
        }
        
        public int getOnline() {
            return online;
        }
        
        public void setOnline(int online) {
            this.online = online;
        }
        
        public int getNoExam() {
            return noExam;
        }
        
        public void setNoExam(int noExam) {
            this.noExam = noExam;
        }
    }
}
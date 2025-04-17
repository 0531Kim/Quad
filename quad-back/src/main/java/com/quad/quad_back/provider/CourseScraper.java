package com.quad.quad_back.provider;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class CourseScraper {

    private static final Logger logger = LoggerFactory.getLogger(CourseScraper.class);
    private final ObjectMapper objectMapper;
    private final JdbcTemplate jdbcTemplate;
    
    @Value("${course.json.file.path:courses.json}")
    private String jsonFilePath;
    
    @Value("${scraper.delay.ms:1000}")
    private long scrapingDelayMs;

    public CourseScraper(ObjectMapper objectMapper, JdbcTemplate jdbcTemplate) {
        this.objectMapper = objectMapper;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public void courseScrap() {
        try {
            List<Map<String, String>> courses = readCoursesFromJson(jsonFilePath);
            processCourses(courses);
        } catch (IOException e) {
        }
    }

    @Transactional
    public void courseScrap(MultipartFile file) {
        try {
            List<Map<String, String>> courses = readCoursesFromUploadedJson(file);
            processCourses(courses);
        } catch (IOException e) {
        }
    }

    private void processCourses(List<Map<String, String>> courses) {
        int processed = 0;
        int failed = 0;

        for (Map<String, String> course : courses) {
            String courseCode = course.get("courseCode");
            String faculty = course.get("faculty");
            if (faculty == null) {
                faculty = course.get("Faculty");
            }
            String titleUrl = course.get("title-url");
            if (titleUrl == null) {
                titleUrl = course.get("titleUrl");
            }
            
            try {
                List<Map<String, String>> scrapedCourses = scrapeCourseDetails(titleUrl);
                
                if (!scrapedCourses.isEmpty()) {
                    
                    for (Map<String, String> scrapedCourse : scrapedCourses) {
                        String courseName = scrapedCourse.get("courseName");
                        String courseTitle = scrapedCourse.get("courseTitle"); // null일 수 있음
                        
                        jdbcTemplate.update(
                            "INSERT INTO course (study_name, department_name, course_name, course_title) VALUES (?, ?, ?, ?)",
                            courseCode,
                            faculty,
                            courseName,
                            courseTitle
                        );
                        processed++;
                        
                    }
                } else {
                    failed++;
                }
                
                try {
                    TimeUnit.MILLISECONDS.sleep(scrapingDelayMs);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            } catch (Exception e) {
                failed++;
            }
        }
    }

    private List<Map<String, String>> scrapeCourseDetails(String url) {
        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
                    .timeout(10000)
                    .get();
            
            Elements coursePapers = doc.select("div.coursePaper");
            
            if (coursePapers.isEmpty()) {
                return List.of(); // 과목이 없으면 빈 리스트 반환
            }
            
            List<Map<String, String>> allCourses = new ArrayList<>();
            
            for (Element coursePaper : coursePapers) {
                Element courseAElement = coursePaper.selectFirst("div.courseA");
                Element titleElement = coursePaper.selectFirst("p.title");
                
                if (courseAElement != null) {
                    String courseName = courseAElement.text().trim();
                    
                    String courseTitle = null;
                    if (titleElement != null && !titleElement.text().trim().isEmpty()) {
                        courseTitle = titleElement.text().trim();
                    }
                    
                    Map<String, String> courseData = new HashMap<>();
                    courseData.put("courseName", courseName);
                    courseData.put("courseTitle", courseTitle);
                    
                    allCourses.add(courseData);
                }
            }
            
            return allCourses;
            
        } catch (IOException e) {
            return List.of();
        }
    }

    private List<Map<String, String>> readCoursesFromJson(String filePath) throws IOException {
        File file = new File(filePath);
        if (!file.exists()) {
            throw new IOException("Can't find json file " + filePath);
        }
        return objectMapper.readValue(file, new TypeReference<List<Map<String, String>>>() {});
    }
    
    private List<Map<String, String>> readCoursesFromUploadedJson(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
            return objectMapper.readValue(inputStream, new TypeReference<List<Map<String, String>>>() {});
        } catch (IOException e) {
            logger.error("json file read error: {}", e.getMessage());
            throw e;
        }
    }
}
package com.quad.quad_back.service;

import com.quad.quad_back.dto.object.CourseDescriptionDto;
import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.entity.CourseDescriptionEntity;
import com.quad.quad_back.entity.CourseEntity;
import com.quad.quad_back.repository.CourseDescriptionRepository;
import com.quad.quad_back.repository.CourseRepository;
import com.quad.quad_back.util.CourseDescriptionUpdater;
import com.quad.quad_back.util.CourseDescriptionUpdater.Course;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class CourseScraperService {
    private static final Logger logger = LoggerFactory.getLogger(CourseScraperService.class);
    
    private final CourseDescriptionUpdater courseDescriptionUpdater;
    private final CourseRepository courseRepository;
    private final CourseDescriptionRepository courseDescriptionRepository;
    
    @Value("${app.course-scraper.output-file:courses.json}")
    private String outputFilePath;
    
    /**
     * Start the course scraping process asynchronously
     * @return CompletableFuture that completes when the scraping is done
     */
    @Async
    public CompletableFuture<String> startScraping() {
        logger.info("Starting course scraping process");
        try {
            courseDescriptionUpdater.updateCourseDescriptions(outputFilePath);
            return CompletableFuture.completedFuture("Course scraping completed successfully. Output saved to " + outputFilePath);
        } catch (Exception e) {
            logger.error("Error during course scraping: {}", e.getMessage(), e);
            return CompletableFuture.failedFuture(e);
        }
    }

    @Transactional
    public void saveCourseDescriptions(List<CourseDescriptionDto> courseDescriptionDtos) {
        for (CourseDescriptionDto dto : courseDescriptionDtos) {

            Optional<CourseEntity> existingCourse = courseRepository.findByCourseName(dto.getCourseName());
            
            System.out.println("Starting from: " + dto.getCourseName());

            if (existingCourse.isEmpty()) {
                System.out.println("Course not found: " + dto.getCourseName());
                continue;
            }

            CourseEntity course = existingCourse.get();

            CourseDescriptionEntity courseDescription = courseDescriptionRepository
                .findByCourse(course)
                .orElse(new CourseDescriptionEntity());
            
            courseDescription.setCourse(course);
            
            courseDescription.setSem1(dto.getSem1() == 1);
            courseDescription.setSem2(dto.getSem2() == 1);
            courseDescription.setSummer(dto.getSummer() == 1);
            courseDescription.setSem1Link(dto.getSem1Link());
            courseDescription.setSem2Link(dto.getSem2Link());
            courseDescription.setSummerLink(dto.getSummerLink());
            courseDescription.setDescription(dto.getDescription());
            courseDescription.setInPerson(dto.getInPerson() == 1);
            courseDescription.setOnline(dto.getOnline() == 1);
            courseDescription.setNoExam(dto.getNoExam() == 1);
            
            courseDescriptionRepository.save(courseDescription);
        }
    }
    
    /**
     * Get the current status of the scraping process
     * @return Status message
     */
    public String getScrapingStatus() {
        // This is a placeholder - in a real application, you would track the status
        return "Status information would be retrieved here";
    }
}
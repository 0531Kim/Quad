package com.quad.quad_back.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quad.quad_back.dto.object.CourseDescriptionDto;
import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.service.CourseScraperService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/courses")
public class CourseScraperController {
    private static final Logger logger = LoggerFactory.getLogger(CourseScraperController.class);
    
    private final CourseScraperService courseScraperService;
    private CompletableFuture<String> scrapingFuture;
    
    @Autowired
    public CourseScraperController(CourseScraperService courseScraperService) {
        this.courseScraperService = courseScraperService;
    }
    
    /**
     * Start the course scraping process
     * @return Response with status information
     */
    @PostMapping("/scrape")
    public ResponseEntity<?> startScraping() {
        logger.info("Received request to start course scraping");
        
        if (scrapingFuture != null && !scrapingFuture.isDone()) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "already_running");
            response.put("message", "Course scraping is already in progress");
            return ResponseEntity.accepted().body(response);
        }
        
        // Start the scraping process
        scrapingFuture = courseScraperService.startScraping();
        
        Map<String, String> response = new HashMap<>();
        response.put("status", "started");
        response.put("message", "Course scraping has been started");
        return ResponseEntity.accepted().body(response);
    }

    @PostMapping("/saveCourseDescriptions")
    public ResponseEntity<String> saveCourseDescriptions(@RequestBody List<CourseDescriptionDto> courseDescriptionDtos) {
        try {
            courseScraperService.saveCourseDescriptions(courseDescriptionDtos);
            return ResponseEntity.ok("Courses saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving courses: " + e.getMessage());
        }
    }

    // @PostMapping("/saveCourseDescriptions")
    // public ResponseEntity<String> saveCourseDescriptions(@RequestParam("file") MultipartFile file) {
    // try {
    //     List<CourseDescriptionDto> courseDescriptionDtos = 
    //         new ObjectMapper().readValue(file.getInputStream(), new TypeReference<List<CourseDescriptionDto>>() {});

    //     courseScraperService.saveCourseDescriptions(courseDescriptionDtos);
    //     return ResponseEntity.ok("Courses saved successfully");
    // } catch (Exception e) {
    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body("Error saving courses: " + e.getMessage());
    // }
// }   
    
    /**
     * Get the current status of the scraping process
     * @return Status information
     */
    @GetMapping("/scrape/status")
    public ResponseEntity<?> getScrapingStatus() {
        logger.info("Received request for scraping status");
        
        Map<String, String> response = new HashMap<>();
        
        if (scrapingFuture == null) {
            response.put("status", "not_started");
            response.put("message", "Course scraping has not been started yet");
        } else if (scrapingFuture.isDone()) {
            try {
                String result = scrapingFuture.get();
                response.put("status", "completed");
                response.put("message", result);
            } catch (InterruptedException | ExecutionException e) {
                response.put("status", "failed");
                response.put("message", "Course scraping failed: " + e.getMessage());
                logger.error("Error retrieving scraping result", e);
            }
        } else {
            response.put("status", "in_progress");
            response.put("message", "Course scraping is in progress");
        }
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Cancel the ongoing scraping process
     * @return Status information
     */
    @DeleteMapping("/scrape")
    public ResponseEntity<?> cancelScraping() {
        logger.info("Received request to cancel scraping");
        
        Map<String, String> response = new HashMap<>();
        
        if (scrapingFuture == null) {
            response.put("status", "not_started");
            response.put("message", "No scraping process to cancel");
        } else if (scrapingFuture.isDone()) {
            response.put("status", "already_completed");
            response.put("message", "Scraping process already completed");
        } else {
            boolean cancelled = scrapingFuture.cancel(true);
            if (cancelled) {
                response.put("status", "cancelled");
                response.put("message", "Scraping process has been cancelled");
            } else {
                response.put("status", "cancel_failed");
                response.put("message", "Failed to cancel the scraping process");
            }
        }
        
        return ResponseEntity.ok(response);
    }
}
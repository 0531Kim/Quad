package com.quad.quad_back.controller;

import com.quad.quad_back.provider.CourseScraper;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
class CourseController {

    private final CourseScraper courseScraper;

    public CourseController(CourseScraper courseScraper) {
        this.courseScraper = courseScraper;
    }

    @PostMapping("/courseScraping")
    public ResponseEntity<String> startScraping(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please upload a JSON file");
            }
            
            if (!file.getOriginalFilename().endsWith(".json")) {
                return ResponseEntity.badRequest().body("Only JSON files are allowed");
            }
            
            courseScraper.courseScrap(file);
            return ResponseEntity.ok("Course scraping initiated successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to initiate course scraping: " + e.getMessage());
        }
    }
}
package com.quad.quad_back.controller;

import java.util.Map;
import java.util.Set;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quad.quad_back.dto.object.ReviewListItem;
import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetCoursesByStudyResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetStudiesByFacultyResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.entity.ReviewListViewEntity;
import com.quad.quad_back.service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/latest")
    public ResponseEntity<? super GetLatestReviewListItemResponseDto> getLatestReview() {
        ResponseEntity<? super GetLatestReviewListItemResponseDto> response = reviewService.getLatestReviewList();
        return response;
    }

    @GetMapping("/trending")
    public ResponseEntity<? super GetTrendingReviewListItemResponseDto> getTrendingReview() {
        ResponseEntity<? super GetTrendingReviewListItemResponseDto> response = reviewService.getTrendingReviewList();
        return response;
    }

    @GetMapping("/allFacultyReviews")
    public ResponseEntity<? super GetAllFacultyReviewsResponseDto> getAllFacultyReview(){
        ResponseEntity<? super GetAllFacultyReviewsResponseDto> response = reviewService.getAllFacultyReview();
        return response;
    }
    
    @GetMapping("/allStudies")
    public ResponseEntity<? super GetStudiesByFacultyResponseDto> getAllStudies() {
        Map<String, Set<String>> studyList = reviewService.getAllStudies();
        return GetStudiesByFacultyResponseDto.success(studyList);
    }

    @GetMapping("/CoursesByStudy")
    public ResponseEntity<? super GetCoursesByStudyResponseDto> getCoursesByStudy(){
        Map<String, Set<CourseDto>> coursesByStudy = reviewService.getAllCoursesByStudy();
        return GetCoursesByStudyResponseDto.success(coursesByStudy);
    }

    @GetMapping("/getCourseReview/{courseName}")
    public ResponseEntity<? super GetCourseReviewResponseDto> getCourseReview(
        @PathVariable("courseName") String courseName
    ) {
        ResponseEntity<? super GetCourseReviewResponseDto> response = reviewService.getCourseReview(courseName);
        return response;
    }   
}

package com.quad.quad_back.service;

import java.util.Map;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetStudiesByFacultyResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseReviewResponseDto;

public interface ReviewService {
    
    ResponseEntity<? super GetLatestReviewListItemResponseDto>getLatestReviewList();
    ResponseEntity<? super GetTrendingReviewListItemResponseDto>getTrendingReviewList();
    ResponseEntity<? super GetAllFacultyReviewsResponseDto>getAllFacultyReview();
    public Map<String, Set<String>> getAllStudies();
    public Map<String, Set<CourseDto>> getAllCoursesByStudy();
    ResponseEntity<? super GetCourseReviewResponseDto> getCourseReview(String courseName);
    
}

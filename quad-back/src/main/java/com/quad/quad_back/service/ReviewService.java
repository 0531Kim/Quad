package com.quad.quad_back.service;

import org.springframework.http.ResponseEntity;

import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;

public interface ReviewService {
    
    ResponseEntity<? super GetLatestReviewListItemResponseDto>getLatestReviewList();
    ResponseEntity<? super GetTrendingReviewListItemResponseDto>getTrendingReviewList();
    ResponseEntity<? super GetAllFacultyReviewsResponseDto>getAllFacultyReview();
}

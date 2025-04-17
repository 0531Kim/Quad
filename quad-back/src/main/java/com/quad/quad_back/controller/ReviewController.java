package com.quad.quad_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



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

    @GetMapping("/test")
    public ResponseEntity<? super GetTrendingReviewListItemResponseDto> test() {
        ResponseEntity<? super GetTrendingReviewListItemResponseDto> response = reviewService.getTrendingReviewList();
        return response;
    }
    

}

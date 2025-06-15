package com.quad.quad_back.controller;

import java.util.Map;
import java.util.Set;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quad.quad_back.dto.object.ReviewListItem;
import com.quad.quad_back.dto.request.review.PostReviewRequestDto;
import com.quad.quad_back.dto.request.review.ReportReviewRequestDto;
import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseDescriptionResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetCoursesByStudyResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetStudiesByFacultyResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.PostReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetLikedReviewIndexListResponseDto;
import com.quad.quad_back.entity.ReviewListViewEntity;
import com.quad.quad_back.service.ReviewService;
import com.quad.quad_back.dto.request.review.DeleteReviewRequestDto;
import com.quad.quad_back.dto.request.review.LikeReviewRequestDto;
import com.quad.quad_back.dto.response.review.LikeReviewResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

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
    
    @GetMapping("/allStudies")
    public ResponseEntity<? super GetStudiesByFacultyResponseDto> getAllStudies() {
        Map<String, Set<String>> studyList = reviewService.getAllStudies();
        return GetStudiesByFacultyResponseDto.success(studyList);
    }

    @GetMapping("/getCourseReview")
    public ResponseEntity<? super GetCourseReviewResponseDto> getCourseReview(
        @RequestParam(value = "courseName", required = false) String courseName
    ) {
        ResponseEntity<? super GetCourseReviewResponseDto> response = reviewService.getCourseReview(courseName);
        return response;
    }

    @GetMapping("/CoursesByStudy")
    public ResponseEntity<? super GetCoursesByStudyResponseDto> getCoursesByStudy(){
        Map<String, Set<CourseDto>> coursesByStudy = reviewService.getAllCoursesByStudy();
        return GetCoursesByStudyResponseDto.success(coursesByStudy);
    }

    @GetMapping("/CourseDescription")
    public ResponseEntity<? super GetCourseDescriptionResponseDto> getCourseDescription(
        @RequestParam(value = "courseName", required = false) String courseName
    ){
        ResponseEntity<? super GetCourseDescriptionResponseDto> response = reviewService.getCourseDescription(courseName);
        return response;
    }

    @PostMapping("")
    public ResponseEntity<? super PostReviewResponseDto> postReview(
            @RequestBody @Valid PostReviewRequestDto requestBody,
            @AuthenticationPrincipal String email) {
        // System.out.println("[ReviewController] Received review request");
        // System.out.println("[ReviewController] Request body: " + requestBody);
        // System.out.println("[ReviewController] User email: " + email);
        
        ResponseEntity<? super PostReviewResponseDto> response = reviewService.postReview(requestBody, email);
        // System.out.println("[ReviewController] Service response: " + response);
        return response;
    }

    @PostMapping("/likes")
    public ResponseEntity<? super LikeReviewResponseDto> postReviewLike(
            @RequestBody @Valid LikeReviewRequestDto dto,
            @AuthenticationPrincipal String email) {
        System.out.println("[ReviewController] postReviewLike called with reviewNumber: " + dto.getReviewNumber());
        System.out.println("[ReviewController] email: " + email);
        ResponseEntity<? super LikeReviewResponseDto> response = reviewService.postReviewLike(dto, email);
        System.out.println("[ReviewController] postReviewLike response: " + response);
        return response;
    }

    @DeleteMapping("/likes")
    public ResponseEntity<? super LikeReviewResponseDto> deleteReviewLike(
            @RequestBody @Valid LikeReviewRequestDto dto,
            @AuthenticationPrincipal String email) {
        System.out.println("[ReviewController] deleteReviewLike called with reviewNumber: " + dto.getReviewNumber());
        System.out.println("[ReviewController] email: " + email);
        ResponseEntity<? super LikeReviewResponseDto> response = reviewService.deleteReviewLike(dto, email);
        System.out.println("[ReviewController] deleteReviewLike response: " + response);
        return response;
    }

    @GetMapping("/likedReviewIndexList")
    public ResponseEntity<? super GetLikedReviewIndexListResponseDto> getLikedReviewIndexList(
        @AuthenticationPrincipal String email) {
        ResponseEntity<? super GetLikedReviewIndexListResponseDto> response = reviewService.getLikedReviewIndexList(email);
        return response;
    }

    @DeleteMapping("")
    public ResponseEntity<ResponseDto> deleteReview(
            @RequestBody @Valid DeleteReviewRequestDto dto,
            @AuthenticationPrincipal String email) {
        
        ResponseEntity<ResponseDto> response = reviewService.deleteReview(dto, email);
        return response;
    }

    @PostMapping("/report")
    public ResponseEntity<ResponseDto> reportReview(
            @RequestBody @Valid ReportReviewRequestDto dto,
            @AuthenticationPrincipal String email) {
        ResponseEntity<ResponseDto> response = reviewService.reportReview(dto, email);
        return response;
    }


} 

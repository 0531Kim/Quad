package com.quad.quad_back.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;

import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.dto.request.review.DeleteReviewRequestDto;
import com.quad.quad_back.dto.request.review.LikeReviewRequestDto;
import com.quad.quad_back.dto.request.review.PostReviewRequestDto;
import com.quad.quad_back.dto.request.review.ReportReviewRequestDto;
import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetStudiesByFacultyResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseDescriptionResponseDto;
import com.quad.quad_back.dto.response.review.PostReviewResponseDto;
import com.quad.quad_back.dto.response.review.LikeReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetLikedReviewIndexListResponseDto;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.review.DeleteReviewResponseDto;
import com.quad.quad_back.dto.response.review.ReportReviewResponseDto;

public interface ReviewService {
    
    ResponseEntity<? super GetLatestReviewListItemResponseDto>getLatestReviewList();
    ResponseEntity<? super GetTrendingReviewListItemResponseDto>getTrendingReviewList();
    public Map<String, Set<String>> getAllStudies();
    public Map<String, Set<CourseDto>> getAllCoursesByStudy();
    ResponseEntity<? super GetCourseReviewResponseDto> getCourseReview(String courseName);
    ResponseEntity<? super GetCourseDescriptionResponseDto> getCourseDescription(String courseName);
    ResponseEntity<? super PostReviewResponseDto> postReview(PostReviewRequestDto postReviewRequestDto, String authorization);
    ResponseEntity<? super LikeReviewResponseDto> postReviewLike(LikeReviewRequestDto dto, String email);
    ResponseEntity<? super LikeReviewResponseDto> deleteReviewLike(LikeReviewRequestDto dto, String email);
    ResponseEntity<? super GetLikedReviewIndexListResponseDto> getLikedReviewIndexList(String email);
    ResponseEntity<ResponseDto> deleteReview(DeleteReviewRequestDto dto, String email);
    ResponseEntity<ResponseDto> reportReview(ReportReviewRequestDto dto, String email);
}

package com.quad.quad_back.service.implement;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.entity.ReviewListViewEntity;
import com.quad.quad_back.repository.ReviewListViewRepository;
import com.quad.quad_back.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImplement implements ReviewService{

    private final ReviewListViewRepository reviewListViewRepository;

    @Override
    public ResponseEntity<? super GetTrendingReviewListItemResponseDto> getTrendingReviewList() {
        
        List<ReviewListViewEntity> reviewListViewEntities = new ArrayList<>();

        try{ 
            
            // Deployment code version
            // Date weekBefore = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
            // SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            // String weekBeforeString = simpleDateFormat.format(weekBefore);
            // reviewListViewEntities = reviewListViewRepository.findTop4ByWriteDatetimeGreaterThanOrderByLikeCountDescWriteDatetimeDesc(weekBeforeString);

            // Test Code
            // Date weekBefore = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
            // SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            // String weekBeforeString = simpleDateFormat.format(weekBefore);
            reviewListViewEntities = reviewListViewRepository.findTop4ByOrderByLikeCountDescWriteDatetimeDesc();

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return GetTrendingReviewListItemResponseDto.success(reviewListViewEntities);
    }

    @Override
    public ResponseEntity<? super GetLatestReviewListItemResponseDto> getLatestReviewList() {
        
        List<ReviewListViewEntity> reviewListViewEntities = new ArrayList<>();
        
        try{
            
            reviewListViewEntities = reviewListViewRepository.findTop4ByOrderByWriteDatetimeDesc();

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetLatestReviewListItemResponseDto.success(reviewListViewEntities);
    }
    
}

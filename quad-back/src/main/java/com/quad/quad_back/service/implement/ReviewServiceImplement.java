package com.quad.quad_back.service.implement;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.quad.quad_back.dto.object.ReviewListItem;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetStudiesByFacultyResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.entity.CourseEntity;
import com.quad.quad_back.entity.ReviewListViewEntity;
import com.quad.quad_back.repository.CourseRepository;
import com.quad.quad_back.repository.ReviewListViewRepository;
import com.quad.quad_back.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImplement implements ReviewService{

    private final ReviewListViewRepository reviewListViewRepository;
    private final CourseRepository courseRepository;

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

    @Override
    public ResponseEntity<? super GetAllFacultyReviewsResponseDto> getAllFacultyReview() {
        List<ReviewListViewEntity> reviewListViewEntities;
        try {
            reviewListViewEntities = reviewListViewRepository.findTop500ByOrderByWriteDatetimeDesc();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        Map<String, List<ReviewListItem>> grouped = reviewListViewEntities.stream()
            .map(ReviewListItem::new)
            .collect(Collectors.groupingBy(
            ReviewListItem::getFaculty,
            Collectors.collectingAndThen(
                Collectors.toList(),
                list -> list.stream()
                              .limit(8)
                              .collect(Collectors.toList())
            )
        ));

        return GetAllFacultyReviewsResponseDto.success(grouped);
    }

    @Override
    @Cacheable("allStudies")
    public Map<String, Set<String>> getAllStudiesMap() {
        Map<String, Set<String>> map = new HashMap<>();
        Set<CourseEntity> studySet = new HashSet<>(courseRepository.findAll());
        for (CourseEntity courseEntity : studySet) {
            String faculty = courseEntity.getDepartment();
            String studyName = courseEntity.getStudyName();
            map.computeIfAbsent(faculty, k -> new HashSet<>()).add(studyName);
        }
        return map;
    }
    
}

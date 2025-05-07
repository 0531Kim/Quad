package com.quad.quad_back.service.implement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.quad.quad_back.dto.object.CourseDescriptionDto;
import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.dto.object.ReviewListItem;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseDescriptionResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.entity.CourseDescriptionEntity;
import com.quad.quad_back.entity.CourseEntity;
import com.quad.quad_back.entity.ReviewListViewEntity;
import com.quad.quad_back.repository.CourseDescriptionRepository;
import com.quad.quad_back.repository.CourseRepository;
import com.quad.quad_back.repository.ReviewListViewRepository;
import com.quad.quad_back.service.ReviewService;

import lombok.RequiredArgsConstructor;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImplement implements ReviewService{

    private final ReviewListViewRepository reviewListViewRepository;
    private final CourseRepository courseRepository;
    private final CourseDescriptionRepository courseDescriptionRepository;

    @Override
    public ResponseEntity<? super GetTrendingReviewListItemResponseDto> getTrendingReviewList() {
        
        List<ReviewListViewEntity> reviewListViewEntities = new ArrayList<>();

        try{ 

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
                ReviewListItem::getFaculty, Collectors.collectingAndThen(
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
    public Map<String, Set<String>> getAllStudies() {
        Map<String, Set<String>> map = new HashMap<>();
        Set<CourseEntity> studySet = new HashSet<>(courseRepository.findAll());
        for (CourseEntity courseEntity : studySet) {
            String faculty = courseEntity.getDepartment();
            String studyName = courseEntity.getStudyTitle();
            map.computeIfAbsent(faculty, k -> new HashSet<>()).add(studyName);
        }
        return map;
    }

    @Override
    @Cacheable("coursesByStudy")
    public Map<String, Set<CourseDto>> getAllCoursesByStudy() {
    Map<String, Set<CourseDto>> map = new HashMap<>();
    List<CourseEntity> courses = courseRepository.findAll();

    for (CourseEntity course : courses) {
        String studyName = course.getStudyName();
        String courseName = course.getCourseName();
        String courseTitle = course.getCourseTitle();

        CourseDto summary = new CourseDto(courseName, courseTitle);
        map.computeIfAbsent(studyName, k -> new HashSet<>()).add(summary);
    }

    return map;
}

    @Override
    public ResponseEntity<? super GetCourseReviewResponseDto> getCourseReview(String courseName) {
        
        List<ReviewListViewEntity> reviewList = new ArrayList<>();
        
        try{
            String modifiedCourseName = courseName.replaceAll("(?<=\\D)(?=\\d)", " ");
            reviewList = reviewListViewRepository.findByCourseName(modifiedCourseName);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetCourseReviewResponseDto.success(reviewList);
    }

    @Override
public ResponseEntity<? super GetCourseDescriptionResponseDto> getCourseDescription(String courseName) {
    try {
        String modifiedCourseName = courseName.replaceAll("(?<=\\D)(?=\\d)", " ");

        // 1. Find CourseEntity
        Optional<CourseEntity> courseOptional = courseRepository.findByCourseName(modifiedCourseName);
        if (courseOptional.isEmpty()) {
            return ResponseDto.databaseError();
        }

        CourseEntity course = courseOptional.get();

        Optional<CourseDescriptionEntity> courseDescriptionOptional = courseDescriptionRepository.findByCourse(course);
        if (courseDescriptionOptional.isEmpty()) {
            return ResponseDto.databaseError();
        }

        CourseDescriptionEntity courseDescription = courseDescriptionOptional.get();

        CourseDescriptionDto dto = new CourseDescriptionDto(courseDescription);
        List<CourseDescriptionDto> dtoList = List.of(dto);

        return GetCourseDescriptionResponseDto.success(dtoList);
        
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseDto.databaseError();
    }
}
    
}

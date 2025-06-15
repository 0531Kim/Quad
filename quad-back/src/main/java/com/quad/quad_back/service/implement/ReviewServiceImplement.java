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
import com.quad.quad_back.dto.request.review.PostReviewRequestDto;
import com.quad.quad_back.dto.request.review.ReportReviewRequestDto;
import com.quad.quad_back.dto.request.review.DeleteReviewRequestDto;
import com.quad.quad_back.dto.request.review.LikeReviewRequestDto;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.review.DeleteReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetAllFacultyReviewsResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseDescriptionResponseDto;
import com.quad.quad_back.dto.response.review.GetCourseReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetLatestReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.GetTrendingReviewListItemResponseDto;
import com.quad.quad_back.dto.response.review.PostReviewResponseDto;
import com.quad.quad_back.dto.response.review.ReportReviewResponseDto;
import com.quad.quad_back.dto.response.review.LikeReviewResponseDto;
import com.quad.quad_back.dto.response.review.GetLikedReviewIndexListResponseDto;
import com.quad.quad_back.entity.CourseDescriptionEntity;
import com.quad.quad_back.entity.CourseEntity;
import com.quad.quad_back.entity.ReviewEntity;
import com.quad.quad_back.entity.ReviewListViewEntity;
import com.quad.quad_back.entity.UserEntity;
import com.quad.quad_back.entity.LikesEntity;
import com.quad.quad_back.entity.ReportEntity;
import com.quad.quad_back.provider.JwtProvider;
import com.quad.quad_back.repository.CourseDescriptionRepository;
import com.quad.quad_back.repository.CourseRepository;
import com.quad.quad_back.repository.ReviewListViewRepository;
import com.quad.quad_back.repository.ReviewRepository;
import com.quad.quad_back.repository.UserRepository;
import com.quad.quad_back.repository.LikesRepository;
import com.quad.quad_back.repository.ReportRepository;
import com.quad.quad_back.service.ReviewService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewServiceImplement implements ReviewService{

    private final ReviewListViewRepository reviewListViewRepository;
    private final CourseRepository courseRepository;
    private final CourseDescriptionRepository courseDescriptionRepository;
    private final JwtProvider jwtProvider;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final LikesRepository likesRepository;
    private final ReportRepository reportRepository;

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
            reviewList = reviewListViewRepository.findByCourseNameOrderByWriteDatetimeDesc(modifiedCourseName);

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

        Optional<CourseEntity> courseOptional = courseRepository.findByCourseName(modifiedCourseName);
        if (courseOptional.isEmpty()) {
            return GetCourseDescriptionResponseDto.courseNotExist();
        }

        CourseEntity course = courseOptional.get();

        Optional<CourseDescriptionEntity> courseDescriptionOptional = courseDescriptionRepository.findByCourse(course);
        if (courseDescriptionOptional.isEmpty()) {
            return GetCourseDescriptionResponseDto.courseNotExist();
        }

        CourseDescriptionEntity courseDescription = courseDescriptionOptional.get();

        CourseDescriptionDto dto = new CourseDescriptionDto(courseDescription);
        CourseDescriptionDto result = dto;

        return GetCourseDescriptionResponseDto.success(result);
        
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseDto.databaseError();
    }
}

    @Override
    public ResponseEntity<? super PostReviewResponseDto> postReview(PostReviewRequestDto postReviewRequestDto,
            String email) {
        try {
            System.out.println("[ReviewService] Looking up course: " + postReviewRequestDto.getCourseName());
            Optional<CourseEntity> courseEntity = courseRepository.findByCourseName(postReviewRequestDto.getCourseName());
            System.out.println("[ReviewService] Course found: " + courseEntity.isPresent());
            
            if (courseEntity.isEmpty()) {
                System.out.println("[ReviewService] Course not found");
                return PostReviewResponseDto.notExistedCourse();
            }

            System.out.println("[ReviewService] Looking up user: " + email);
            UserEntity userEntity = userRepository.findByEmail(email);
            System.out.println("[ReviewService] User found: " + userEntity != null);
            
            if (userEntity == null) {
                System.out.println("[ReviewService] User not found");
                return PostReviewResponseDto.notExistUser();
            }

            System.out.println("[ReviewService] Creating review entity");
            ReviewEntity reviewEntity = new ReviewEntity(postReviewRequestDto, email, courseEntity.get(), userEntity);
            System.out.println("[ReviewService] Saving review entity");
            reviewRepository.save(reviewEntity);
            System.out.println("[ReviewService] Review saved successfully");

            return PostReviewResponseDto.success();
        } catch (Exception exception) {
            System.out.println("[ReviewService] Error occurred: " + exception.getMessage());
            exception.printStackTrace();
            return PostReviewResponseDto.databaseError();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<? super LikeReviewResponseDto> postReviewLike(LikeReviewRequestDto dto, String email) {
        System.out.println("[ReviewService] postReviewLike called with reviewNumber: " + dto.getReviewNumber());
        System.out.println("[ReviewService] email: " + email);
        
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            System.out.println("[ReviewService] User found: " + (userEntity != null ? userEntity.getEmail() : "null"));
            if (userEntity == null) return ResponseDto.databaseError();

            Optional<ReviewEntity> reviewEntity = reviewRepository.findById(dto.getReviewNumber());
            System.out.println("[ReviewService] Review found: " + (reviewEntity.isPresent() ? reviewEntity.get().getReviewNumber() : "null"));
            if (reviewEntity.isEmpty()) return ResponseDto.databaseError();

            // Check if already liked
            boolean isLiked = likesRepository.existsByUserAndReview(userEntity, reviewEntity.get());
            System.out.println("[ReviewService] Already liked: " + isLiked);
            if (isLiked) {
                return ResponseDto.databaseError();
            }

            // Create like entity
            LikesEntity likesEntity = new LikesEntity(userEntity, reviewEntity.get());
            likesRepository.save(likesEntity);
            System.out.println("[ReviewService] Like saved successfully");

            // Update review like count
            ReviewEntity review = reviewEntity.get();
            review.setLikeCount(review.getLikeCount() + 1);
            reviewRepository.save(review);
            System.out.println("[ReviewService] Review like count updated: " + review.getLikeCount());

            return LikeReviewResponseDto.success(review.getLikeCount());

        } catch (Exception exception) {
            System.out.println("[ReviewService] Error in postReviewLike: " + exception.getMessage());
            exception.printStackTrace();
            return LikeReviewResponseDto.databaseError();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<? super LikeReviewResponseDto> deleteReviewLike(LikeReviewRequestDto dto, String email) {
        System.out.println("[ReviewService] deleteReviewLike called with reviewNumber: " + dto.getReviewNumber());
        System.out.println("[ReviewService] email: " + email);
        
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            System.out.println("[ReviewService] User found: " + (userEntity != null ? userEntity.getEmail() : "null"));
            if (userEntity == null) return ResponseDto.databaseError();

            Optional<ReviewEntity> reviewEntity = reviewRepository.findById(dto.getReviewNumber());
            System.out.println("[ReviewService] Review found: " + (reviewEntity.isPresent() ? reviewEntity.get().getReviewNumber() : "null"));
            if (reviewEntity.isEmpty()) return ResponseDto.databaseError();

            // Check if not liked
            boolean isLiked = likesRepository.existsByUserAndReview(userEntity, reviewEntity.get());
            System.out.println("[ReviewService] Is liked: " + isLiked);
            if (!isLiked) {
                return ResponseDto.databaseError();
            }

            // Delete like entity
            likesRepository.deleteByUserAndReview(userEntity, reviewEntity.get());
            System.out.println("[ReviewService] Like deleted successfully");

            // Update review like count
            ReviewEntity review = reviewEntity.get();
            review.setLikeCount(review.getLikeCount() - 1);
            reviewRepository.save(review);
            System.out.println("[ReviewService] Review like count updated: " + review.getLikeCount());

            return LikeReviewResponseDto.success(review.getLikeCount());

        } catch (Exception exception) {
            System.out.println("[ReviewService] Error in deleteReviewLike: " + exception.getMessage());
            exception.printStackTrace();
            return LikeReviewResponseDto.databaseError();
        }
    }

    @Override
    public ResponseEntity<? super GetLikedReviewIndexListResponseDto> getLikedReviewIndexList(String email) {
        try {
            System.out.println("[DEBUG] Getting liked review indices for user email: " + email);
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                System.out.println("[DEBUG] User not found for email: " + email);
                return ResponseDto.databaseError();
            }
            System.out.println("[DEBUG] Found user: " + userEntity.getEmail());

            List<LikesEntity> likesEntities = likesRepository.findByUser(userEntity);
            System.out.println("[DEBUG] Found " + likesEntities.size() + " likes for user");

            List<Integer> likedReviewIndexList = likesEntities.stream()
                .map(LikesEntity::getReview)
                .map(ReviewEntity::getReviewNumber)
                .collect(Collectors.toList());
            System.out.println("[DEBUG] Liked review indices: " + likedReviewIndexList);

            return GetLikedReviewIndexListResponseDto.success(likedReviewIndexList);
        } catch (Exception exception) {
            System.out.println("[DEBUG] Error occurred: " + exception.getMessage());
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> deleteReview(DeleteReviewRequestDto dto, String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return ResponseDto.databaseError();
            }

            Optional<ReviewEntity> reviewEntityOpt = reviewRepository.findById(dto.getReviewNumber());
            if (reviewEntityOpt.isEmpty()) {
                return ResponseDto.databaseError();
            }
            ReviewEntity reviewEntity = reviewEntityOpt.get();

            if (reviewEntity.getUser().getUserId() != userEntity.getUserId()) {
                return ResponseDto.databaseError();
            }

            likesRepository.deleteByReview(reviewEntity);
            reviewRepository.delete(reviewEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteReviewResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> reportReview(ReportReviewRequestDto dto, String email) {
        try {
            UserEntity reporter = userRepository.findByEmail(email);
            if (reporter == null) {
                return ReportReviewResponseDto.databaseError();
            }

            ReportEntity report = ReportEntity.builder()
                    .targetType(ReportEntity.TargetType.REVIEW)
                    .targetId(dto.getReviewNumber())
                    .reporterUserId(reporter.getUserId())
                    .reportReason(dto.getReportReason())
                    .reportDate(LocalDateTime.now())
                    .build();

            reportRepository.save(report);

        } catch (Exception e) {
            e.printStackTrace();
            return ReportReviewResponseDto.databaseError();
        }
        return ReportReviewResponseDto.success();
    }
}   

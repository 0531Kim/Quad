package com.quad.quad_back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.CourseDescriptionEntity;
import com.quad.quad_back.entity.CourseEntity;

@Repository
public interface CourseDescriptionRepository extends JpaRepository<CourseDescriptionEntity, Long> {
    // Optional<CourseDescriptionEntity> findByCourseName(String courseName);
    Optional<CourseDescriptionEntity> findByCourse(CourseEntity course);
}
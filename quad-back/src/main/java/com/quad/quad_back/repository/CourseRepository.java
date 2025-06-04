package com.quad.quad_back.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.CourseEntity;
import com.quad.quad_back.util.CourseDescriptionUpdater.Course;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {

//    List<CourseEntity> findAll();
    Optional<CourseEntity> findByCourseName(String courseName);   

}

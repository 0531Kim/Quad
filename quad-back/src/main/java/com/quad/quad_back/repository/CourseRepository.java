package com.quad.quad_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.CourseEntity;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, String> {
}

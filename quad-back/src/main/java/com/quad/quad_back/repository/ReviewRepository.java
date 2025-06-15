package com.quad.quad_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quad.quad_back.entity.ReviewEntity;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
    
}

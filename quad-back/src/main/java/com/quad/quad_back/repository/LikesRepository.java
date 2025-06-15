package com.quad.quad_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.LikesEntity;
import com.quad.quad_back.entity.LikesId;
import com.quad.quad_back.entity.ReviewEntity;
import com.quad.quad_back.entity.UserEntity;

@Repository
public interface LikesRepository extends JpaRepository<LikesEntity, LikesId> {
    boolean existsByUserAndReview(UserEntity user, ReviewEntity review);
    void deleteByUserAndReview(UserEntity user, ReviewEntity review);
    void deleteByReview(ReviewEntity review);
    List<LikesEntity> findByUser(UserEntity user);
} 
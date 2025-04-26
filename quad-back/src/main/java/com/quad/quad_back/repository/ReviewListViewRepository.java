package com.quad.quad_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.ReviewListViewEntity;

@Repository
public interface ReviewListViewRepository extends JpaRepository<ReviewListViewEntity, Integer>{
    List<ReviewListViewEntity> findTop4ByWriteDatetimeGreaterThanOrderByLikeCountDescWriteDatetimeDesc(String writeDatetime);
    List<ReviewListViewEntity> findTop4ByOrderByWriteDatetimeDesc();
    List<ReviewListViewEntity> findTop4ByOrderByLikeCountDescWriteDatetimeDesc();
    List<ReviewListViewEntity> findTop500ByOrderByWriteDatetimeDesc();
    List<ReviewListViewEntity> findByCourseNameContainingIgnoreCase(String courseName);
    
}

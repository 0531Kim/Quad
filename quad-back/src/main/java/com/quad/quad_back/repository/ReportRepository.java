package com.quad.quad_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quad.quad_back.entity.ReportEntity;

public interface ReportRepository extends JpaRepository<ReportEntity, Integer> {
}

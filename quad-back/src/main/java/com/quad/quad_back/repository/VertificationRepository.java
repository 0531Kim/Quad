package com.quad.quad_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.EmailVerificationEntity;

import jakarta.transaction.Transactional;

@Repository
public interface VertificationRepository extends JpaRepository<EmailVerificationEntity, String>{
    
    EmailVerificationEntity findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}

package com.quad.quad_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.UserEntity;

// @Repository makes this inferface a java bean
// works same as @bean
@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{
    
    boolean existsByUsername(String username);
    
    UserEntity findByUserID(String userId);
}

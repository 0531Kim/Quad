package com.quad.quad_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quad.quad_back.entity.UserEntity;

// @Repository makes this inferface a java bean
// works same as @bean
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>{
    
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    UserEntity findByUserId(Integer userId);
    UserEntity findByUsername(String username);
    UserEntity findByEmail(String email);
}

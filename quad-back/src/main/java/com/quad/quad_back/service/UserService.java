package com.quad.quad_back.service;

import org.springframework.http.ResponseEntity;

import com.quad.quad_back.dto.request.auth.ChangeUsernameRequestDto;
import com.quad.quad_back.dto.response.auth.ChangeUsernameResponseDto;
import com.quad.quad_back.dto.response.user.GetSignInUserResponseDto;

public interface UserService {
    
    ResponseEntity<? super ChangeUsernameResponseDto>changeUsername(ChangeUsernameRequestDto dto);
    ResponseEntity<? super GetSignInUserResponseDto>getSignInUser(String email);
}

package com.quad.quad_back.service;

import org.springframework.http.ResponseEntity;

import com.quad.quad_back.dto.request.auth.ChangePasswordRequestDto;
import com.quad.quad_back.dto.request.auth.ChangeUsernameRequestDto;
import com.quad.quad_back.dto.request.auth.ConfirmEmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.EmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.FindPasswordEmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.SignInRequestDto;
import com.quad.quad_back.dto.request.auth.SignUpRequestDto;
import com.quad.quad_back.dto.request.auth.UsernameCheckRequestDto;
import com.quad.quad_back.dto.response.auth.ChangePasswordResponseDto;
import com.quad.quad_back.dto.response.auth.ChangeUsernameResponseDto;
import com.quad.quad_back.dto.response.auth.ConfirmEmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.EmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.SignInResponseDto;
import com.quad.quad_back.dto.response.auth.SignUpResponseDto;
import com.quad.quad_back.dto.response.auth.UsernameCheckResponseDto;
import com.quad.quad_back.dto.response.auth.FindPasswordEmailVerificationResponseDto;

public interface AuthService {
    
    ResponseEntity<? super UsernameCheckResponseDto> usernameCheck(UsernameCheckRequestDto dto);
    ResponseEntity<? super EmailVerificationResponseDto> emailVerification(EmailVerificationRequestDto dto);
    ResponseEntity<? super FindPasswordEmailVerificationResponseDto> findPasswordEmailVerification(FindPasswordEmailVerificationRequestDto dto);
    ResponseEntity<? super ConfirmEmailVerificationResponseDto> confirmVerification(ConfirmEmailVerificationRequestDto dto);

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

    ResponseEntity<? super ChangeUsernameResponseDto>changeUsername(ChangeUsernameRequestDto dto);
    ResponseEntity<? super ChangePasswordResponseDto>changePassword(ChangePasswordRequestDto dto);

}

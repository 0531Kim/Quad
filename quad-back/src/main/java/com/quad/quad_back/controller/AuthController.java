package com.quad.quad_back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.quad.quad_back.dto.request.auth.ConfirmEmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.EmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.SignInRequestDto;
import com.quad.quad_back.dto.request.auth.SignUpRequestDto;
import com.quad.quad_back.dto.response.auth.ConfirmEmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.EmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.SignInResponseDto;
import com.quad.quad_back.dto.response.auth.SignUpResponseDto;
import com.quad.quad_back.dto.request.auth.UsernameCheckRequestDto;
import com.quad.quad_back.dto.response.auth.UsernameCheckResponseDto;
import com.quad.quad_back.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/username-check")
    public ResponseEntity<? super UsernameCheckResponseDto> usernameCheck(
        @RequestBody @Valid UsernameCheckRequestDto requestBody
    ) {
        ResponseEntity<? super UsernameCheckResponseDto> response = authService.usernameCheck(requestBody);
        return response;
    }

    @PostMapping("/email-verification")
    public ResponseEntity<? super EmailVerificationResponseDto> emailVerification(
        @RequestBody @Valid EmailVerificationRequestDto requestBody
    ) {
        ResponseEntity<? super EmailVerificationResponseDto> response = authService.emailVerification(requestBody);
        return response;
    }
    
    @PostMapping("/confirm-email-verification")
    public ResponseEntity<? super ConfirmEmailVerificationResponseDto> confirmEmailVerification(
        @RequestBody @Valid ConfirmEmailVerificationRequestDto requestBody) {
        ResponseEntity<? super ConfirmEmailVerificationResponseDto> response = authService.confirmVerification(requestBody);
        return response;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
        @RequestBody @Valid SignUpRequestDto requestBody
    ){
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
        @RequestBody @Valid SignInRequestDto requestBody
    ){
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }
}

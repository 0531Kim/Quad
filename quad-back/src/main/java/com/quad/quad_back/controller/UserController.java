package com.quad.quad_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quad.quad_back.dto.request.auth.ChangeUsernameRequestDto;
import com.quad.quad_back.dto.response.auth.ChangeUsernameResponseDto;
import com.quad.quad_back.dto.response.user.GetSignInUserResponseDto;
import com.quad.quad_back.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @PatchMapping("/change-username")
    public ResponseEntity<? super ChangeUsernameResponseDto> changeUsername(
        @RequestBody ChangeUsernameRequestDto requestBody
    ) {
        ResponseEntity<? super ChangeUsernameResponseDto> response = userService.changeUsername(requestBody);
        return response;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(
        @AuthenticationPrincipal String email
    ){
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignInUser(email);
        return response;
    }

}

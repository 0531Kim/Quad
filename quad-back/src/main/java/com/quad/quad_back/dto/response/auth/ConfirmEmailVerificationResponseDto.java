package com.quad.quad_back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class ConfirmEmailVerificationResponseDto extends ResponseDto{
    private ConfirmEmailVerificationResponseDto(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<ConfirmEmailVerificationResponseDto> success(){
        ConfirmEmailVerificationResponseDto responseBody = new ConfirmEmailVerificationResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ConfirmEmailVerificationResponseDto> verificationFail(){
        ConfirmEmailVerificationResponseDto responseBody = new ConfirmEmailVerificationResponseDto();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
}

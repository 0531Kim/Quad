package com.quad.quad_back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class ConfirmEmailVerificationResponseDto extends ResponseDto{
    private ConfirmEmailVerificationResponseDto(String code, String message){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<ConfirmEmailVerificationResponseDto> success(){
        ConfirmEmailVerificationResponseDto responseBody = new ConfirmEmailVerificationResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> verificationFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.EMAIL_VERIFICATION_FAILED, ResponseMessage.EMAIL_VERIFICATION_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
}

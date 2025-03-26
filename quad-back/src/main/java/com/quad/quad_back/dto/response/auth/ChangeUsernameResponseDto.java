package com.quad.quad_back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

public class ChangeUsernameResponseDto extends ResponseDto{

    private ChangeUsernameResponseDto(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<ChangeUsernameResponseDto> success(){
        ChangeUsernameResponseDto result = new ChangeUsernameResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> verificationFail(){
        ResponseDto result = new ResponseDto(ResponseCode.VALIDATION_FAILED, ResponseMessage.VALIDATION_FAILED);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}

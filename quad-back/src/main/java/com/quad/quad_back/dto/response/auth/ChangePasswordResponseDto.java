package com.quad.quad_back.dto.response.auth;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

public class ChangePasswordResponseDto extends ResponseDto{
    
    private ChangePasswordResponseDto(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);       
    }

    public static ResponseEntity<? super ChangePasswordResponseDto>success(){
        ChangePasswordResponseDto result = new ChangePasswordResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}

package com.quad.quad_back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class FindPasswordEmailVerificationResponseDto extends ResponseDto{
    
    private FindPasswordEmailVerificationResponseDto(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<FindPasswordEmailVerificationResponseDto> success(){
        FindPasswordEmailVerificationResponseDto responseBody = new FindPasswordEmailVerificationResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistEmail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXISTED_EMAIL, ResponseMessage.NOT_EXISTED_EMAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> mailSendFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.MAIL_SEND_FAILED, ResponseMessage.MAIL_SEND_FAILED);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> signInTypeWrong(){
        ResponseDto result = new ResponseDto(ResponseCode.SIGN_IN_TYPE_WRONG, ResponseMessage.SIGN_IN_TYPE_WRONG);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}

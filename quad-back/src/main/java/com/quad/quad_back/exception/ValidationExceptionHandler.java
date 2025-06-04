package com.quad.quad_back.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.quad.quad_back.dto.response.ResponseDto;

@RestControllerAdvice
public class ValidationExceptionHandler {
    
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ResponseDto> exceptionHandler(Exception exception){
        return ResponseDto.validationFailed();
    }

}

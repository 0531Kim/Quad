package com.quad.quad_back.dto.response.review;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class GetStudiesByFacultyResponseDto extends ResponseDto{

    private List<String> studyList;

    private GetStudiesByFacultyResponseDto(List<String> studyList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.studyList = studyList;
    }

    public static ResponseEntity<? super GetStudiesByFacultyResponseDto> success(List<String> studyList) {
        GetStudiesByFacultyResponseDto responseBody = new GetStudiesByFacultyResponseDto(studyList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
} 

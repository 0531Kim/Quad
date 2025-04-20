package com.quad.quad_back.dto.response.review;

import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class GetStudiesByFacultyResponseDto extends ResponseDto{

    private Map<String, Set<String>> studyList;

    private GetStudiesByFacultyResponseDto(Map<String, Set<String>> studyList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.studyList = studyList;
    }

    public static ResponseEntity<? super GetStudiesByFacultyResponseDto> success(Map<String, Set<String>> studyList) {
        GetStudiesByFacultyResponseDto responseBody = new GetStudiesByFacultyResponseDto(studyList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
} 

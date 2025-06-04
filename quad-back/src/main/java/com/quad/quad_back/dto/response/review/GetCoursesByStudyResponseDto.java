package com.quad.quad_back.dto.response.review;

import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.object.CourseDto;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class GetCoursesByStudyResponseDto extends ResponseDto{
    
    private Map<String, Set<CourseDto>> courses;

    private GetCoursesByStudyResponseDto(Map<String, Set<CourseDto>> courses){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.courses = courses;
    }

    public static ResponseEntity<? super GetCoursesByStudyResponseDto> success(Map<String, Set<CourseDto>> courses){
        GetCoursesByStudyResponseDto responseBody = new GetCoursesByStudyResponseDto(courses);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

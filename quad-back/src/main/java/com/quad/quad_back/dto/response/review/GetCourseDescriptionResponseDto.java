package com.quad.quad_back.dto.response.review;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.object.CourseDescriptionDto;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class GetCourseDescriptionResponseDto extends ResponseDto {
    
    private List<CourseDescriptionDto> courseDescriptionList;

    private GetCourseDescriptionResponseDto(List<CourseDescriptionDto> courseDescriptionList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.courseDescriptionList = courseDescriptionList;
    }

    public static ResponseEntity<? super GetCourseDescriptionResponseDto> success(List<CourseDescriptionDto> courseDescriptionList) {
        GetCourseDescriptionResponseDto responseBody = new GetCourseDescriptionResponseDto(courseDescriptionList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
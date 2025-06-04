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
    
    private CourseDescriptionDto courseDescription;

    private GetCourseDescriptionResponseDto(CourseDescriptionDto courseDescription) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.courseDescription = courseDescription;
    }

    public static ResponseEntity<? super GetCourseDescriptionResponseDto> success(CourseDescriptionDto courseDescription) {
        GetCourseDescriptionResponseDto responseBody = new GetCourseDescriptionResponseDto(courseDescription);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<? super ResponseDto> courseNotExist() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXISTED_COURSE, ResponseMessage.NOT_EXISTED_COURSE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
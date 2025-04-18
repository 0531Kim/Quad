package com.quad.quad_back.dto.response.review;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.object.HighLightReviewListItem;
import com.quad.quad_back.dto.object.ReviewListItem;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.entity.ReviewListViewEntity;

import lombok.Getter;

@Getter
public class GetAllFacultyReviewsResponseDto extends ResponseDto{

    private Map<String, List<ReviewListItem>> result = new HashMap<>();

    private GetAllFacultyReviewsResponseDto(Map<String, List<ReviewListItem>> reviewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.result = reviewEntities;
    }

    public static ResponseEntity<? super GetAllFacultyReviewsResponseDto> success(Map<String, List<ReviewListItem>> reviewEntities) {
        GetAllFacultyReviewsResponseDto responseBody = new GetAllFacultyReviewsResponseDto(reviewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
} 

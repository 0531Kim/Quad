package com.quad.quad_back.dto.response.review;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.entity.ReviewListViewEntity;
import com.quad.quad_back.dto.object.ReviewListItem;

import lombok.Getter;

@Getter
public class GetCourseReviewResponseDto extends ResponseDto{
    private List<ReviewListItem> reviewList;

    private GetCourseReviewResponseDto(List<ReviewListViewEntity> reviewList){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.reviewList = reviewList.stream()
            .map(ReviewListItem::new)
            .collect(Collectors.toList());
    }

    public static ResponseEntity<? super GetCourseReviewResponseDto> success(List<ReviewListViewEntity> reviewList){
        GetCourseReviewResponseDto responseBody = new GetCourseReviewResponseDto(reviewList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

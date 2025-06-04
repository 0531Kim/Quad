package com.quad.quad_back.dto.response.review;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.entity.ReviewListViewEntity;

import lombok.Getter;

import com.quad.quad_back.dto.object.HighLightReviewListItem;

@Getter
public class GetLatestReviewListItemResponseDto extends ResponseDto{

    private List<HighLightReviewListItem> latestReviews;

    private GetLatestReviewListItemResponseDto(List<ReviewListViewEntity> reviewEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestReviews = HighLightReviewListItem.getList(reviewEntities);
    }

    public static ResponseEntity<GetLatestReviewListItemResponseDto> success(List<ReviewListViewEntity> reviewEntities){
        GetLatestReviewListItemResponseDto responseBody = new GetLatestReviewListItemResponseDto(reviewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

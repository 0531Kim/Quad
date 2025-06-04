package com.quad.quad_back.dto.response.review;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.object.HighLightReviewListItem;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.entity.ReviewListViewEntity;

import lombok.Getter;

@Getter
public class GetTrendingReviewListItemResponseDto extends ResponseDto{

    private List<HighLightReviewListItem> trendingReviews;

    private GetTrendingReviewListItemResponseDto(List<ReviewListViewEntity> reviewEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.trendingReviews = HighLightReviewListItem.getList(reviewEntities);
    }

    public static ResponseEntity<GetTrendingReviewListItemResponseDto> success(List<ReviewListViewEntity> reviewEntities){
        GetTrendingReviewListItemResponseDto result = new GetTrendingReviewListItemResponseDto(reviewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
package com.quad.quad_back.dto.response.review;

import com.quad.quad_back.dto.response.ResponseDto;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;

@Getter
public class GetLikedReviewIndexListResponseDto extends ResponseDto {
    private List<Integer> likedReviewIndexList;

    private GetLikedReviewIndexListResponseDto(List<Integer> likedReviewIndexList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.likedReviewIndexList = likedReviewIndexList;
    }

    public static ResponseEntity<? super GetLikedReviewIndexListResponseDto> success(List<Integer> likedReviewIndexList) {
        GetLikedReviewIndexListResponseDto responseBody = new GetLikedReviewIndexListResponseDto(likedReviewIndexList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

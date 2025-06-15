package com.quad.quad_back.dto.response.review;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class LikeReviewResponseDto extends ResponseDto {
    private Integer updatedLikeCount;

    private LikeReviewResponseDto(String code, String message, Integer updatedLikeCount) {
        super(code, message);
        this.updatedLikeCount = updatedLikeCount;
    }

    public static ResponseEntity<LikeReviewResponseDto> success(Integer updatedLikeCount) {
        LikeReviewResponseDto responseBody = new LikeReviewResponseDto("SU", "Success", updatedLikeCount);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> databaseError() {
        ResponseDto responseBody = new ResponseDto("DBE", "Database Error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
} 
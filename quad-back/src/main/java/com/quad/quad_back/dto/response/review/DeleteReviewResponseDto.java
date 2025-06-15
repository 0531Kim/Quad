package com.quad.quad_back.dto.response.review;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class DeleteReviewResponseDto extends ResponseDto {

    private DeleteReviewResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<ResponseDto> success() {
        DeleteReviewResponseDto responseBody = new DeleteReviewResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

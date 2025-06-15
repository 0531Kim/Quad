package com.quad.quad_back.dto.response.review;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.quad.quad_back.common.ResponseCode;
import com.quad.quad_back.common.ResponseMessage;
import com.quad.quad_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class ReportReviewResponseDto extends ResponseDto {

    private ReportReviewResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<ResponseDto> success() {
        ReportReviewResponseDto responseBody = new ReportReviewResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

package com.quad.quad_back.dto.request.review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReportReviewRequestDto {
    private int reviewNumber;
    private String reportReason;
}

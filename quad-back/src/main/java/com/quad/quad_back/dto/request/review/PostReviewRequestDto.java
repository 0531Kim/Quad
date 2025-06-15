package com.quad.quad_back.dto.request.review;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostReviewRequestDto {
    private String courseName;
    private Integer score;
    private Integer semester;
    private Integer quality;
    private Integer enjoyable;
    private Integer difficulty;
    private Integer workload;
    private Integer exam;
    private String content;
}

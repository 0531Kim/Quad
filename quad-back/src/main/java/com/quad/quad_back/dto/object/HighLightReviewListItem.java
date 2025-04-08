package com.quad.quad_back.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HighLightReviewListItem {
    private String courseName;
    private Double avgScore;
    private String time;
    private Integer views;
    private String content;
}
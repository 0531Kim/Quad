package com.quad.quad_back.dto.request.review;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GetCourseReviewRequestDto {
    
    @NotNull
    String courseName;
}

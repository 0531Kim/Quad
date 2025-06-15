package com.quad.quad_back.dto.request.review;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LikeReviewRequestDto {
    @NotNull
    private Integer reviewNumber;
} 
package com.quad.quad_back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDescriptionDto {
    private Long id;
    private String courseId;
    private Boolean sem1;
    private Boolean sem2;
    private Boolean summer;
    private String sem1Link;
    private String sem2Link;
    private String summerLink;
    private String description;
} 
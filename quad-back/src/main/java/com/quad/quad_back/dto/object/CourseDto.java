package com.quad.quad_back.dto.object;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto implements Serializable {
    private String courseName;
    private String courseTitle;
}

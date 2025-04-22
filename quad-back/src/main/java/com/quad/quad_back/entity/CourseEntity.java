package com.quad.quad_back.entity;

import lombok.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@Entity
@Table(name = "course")
public class CourseEntity {
    
    @Id
    @Column(name = "course_name")
    private String courseName;

    @Column(name = "study_name")
    private String studyName;
    
    @Column(name = "department_name")
    private String department;
    
    @Column(name = "course_title")
    private String courseTitle;

    @Column(name = "study_title")
    private String studyTitle;
}

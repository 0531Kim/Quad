package com.quad.quad_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "course_description")
@NoArgsConstructor
@AllArgsConstructor
public class CourseDescriptionEntity {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "course_id")
    private CourseEntity course;
    
    @Column(name = "sem1")
    private Boolean sem1;
    
    @Column(name = "sem2")
    private Boolean sem2;
    
    @Column(name = "summer")
    private Boolean summer;
    
    @Column(name = "sem1_link")
    private String sem1Link;
    
    @Column(name = "sem2_link")
    private String sem2Link;
    
    @Column(name = "summer_link")
    private String summerLink;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}

package com.quad.quad_back.dto.object;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.quad.quad_back.entity.CourseDescriptionEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CourseDescriptionDto {
    @JsonProperty("courseName")
    private String courseName;
    
    @JsonProperty("sem1")
    private Integer sem1;
    
    @JsonProperty("sem2")
    private Integer sem2;
    
    @JsonProperty("summer")
    private Integer summer;
    
    @JsonProperty("sem1_link")
    private String sem1Link;
    
    @JsonProperty("sem2_link")
    private String sem2Link;
    
    @JsonProperty("summer_link")
    private String summerLink;
    
    @JsonProperty("description")
    private String description;
    
    @JsonProperty("in_person")
    private Integer inPerson;
    
    @JsonProperty("online")
    private Integer online;
    
    @JsonProperty("noExam")
    private Integer noExam;


    public CourseDescriptionDto(CourseDescriptionEntity entity) {
    this.courseName = entity.getCourse().getCourseName();
    this.sem1 = entity.getSem1() ? 1 : 0;
    this.sem2 = entity.getSem2() ? 1 : 0;
    this.summer = entity.getSummer() ? 1 : 0;
    this.sem1Link = entity.getSem1Link();
    this.sem2Link = entity.getSem2Link();
    this.summerLink = entity.getSummerLink();
    this.description = entity.getDescription();
}
}

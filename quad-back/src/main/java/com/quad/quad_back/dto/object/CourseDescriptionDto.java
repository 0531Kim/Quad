package com.quad.quad_back.dto.object;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
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
}

package com.quad.quad_back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="review_list_view")
@Table(name="review_list_view")
public class ReviewListViewEntity {
    
    @Id
    private int reviewNumber;
    private String courseName;
    private int score;
    private int quality;
    private int enjoyable;
    private int difficulty;
    private int workload;
    private int exam;
    private String writeDatetime;
    private int takenSemester;
    private String content;
    private int likeCount;
    private String username;
}

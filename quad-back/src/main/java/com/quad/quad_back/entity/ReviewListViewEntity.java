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
    private String title;
    private String content;
    private String courseName;
    private int likeCount;
    private int commentCount;
    private int viewCount;
    private String writeDatetime;
    private int difficulty;
    private int leniency;
    private int entertaining;
    private int quality;
    private String username;
    
}

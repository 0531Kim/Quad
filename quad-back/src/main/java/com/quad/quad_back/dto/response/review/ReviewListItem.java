package com.quad.quad_back.dto.response.review;

import com.quad.quad_back.entity.ReviewEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewListItem {
    private String courseCode;
    private Integer score;
    private Integer semester;
    private Integer quality;
    private Integer enjoyable;
    private Integer difficulty;
    private Integer workload;
    private Integer exam;
    private String content;
    private String userEmail;
    private String writeDatetime;

    public ReviewListItem(ReviewEntity reviewEntity) {
        this.courseCode = reviewEntity.getCourse().getCourseName();
        this.score = reviewEntity.getScore();
        this.semester = reviewEntity.getTakenSemester();
        this.quality = reviewEntity.getQuality();
        this.enjoyable = reviewEntity.getEnjoyable();
        this.difficulty = reviewEntity.getDifficulty();
        this.workload = reviewEntity.getWorkload();
        this.exam = reviewEntity.getExam();
        this.content = reviewEntity.getContent();
        this.userEmail = reviewEntity.getUser().getEmail();
        this.writeDatetime = reviewEntity.getWriteDatetime();
    }
} 
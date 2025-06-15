package com.quad.quad_back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;

import com.quad.quad_back.dto.request.review.PostReviewRequestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "review")
@Table(name = "review")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_number")
    private Integer reviewNumber;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private CourseEntity course;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    
    private Integer score;
    
    @Column(name = "taken_semester")
    private Integer takenSemester;
    
    private Integer quality;
    private Integer enjoyable;
    private Integer difficulty;
    private Integer workload;
    private Integer exam;
    private String content;
    private String writeDatetime;
    @Column(name = "like_count")
    private Integer likeCount;

    public ReviewEntity(PostReviewRequestDto dto, String email, CourseEntity course, UserEntity user) {
        this.course = course;
        this.user = user;
        this.score = dto.getScore();
        this.takenSemester = dto.getSemester();
        this.quality = dto.getQuality();
        this.enjoyable = dto.getEnjoyable();
        this.difficulty = dto.getDifficulty();
        this.workload = dto.getWorkload();
        this.exam = dto.getExam();
        this.content = dto.getContent();
        this.writeDatetime = LocalDateTime.now().toString();
        this.likeCount = 0;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }
} 
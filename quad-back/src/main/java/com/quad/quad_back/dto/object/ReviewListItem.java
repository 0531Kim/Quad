package com.quad.quad_back.dto.object;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
// import java.util.ArrayList;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

import com.quad.quad_back.entity.ReviewListViewEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewListItem {
    private int reviewNumber;
    private String username;
    private String courseName;
    private String date;
    private int difficulty;
    private int workload;
    private int enjoyable;
    private int quality;
    private int takenSemester;
    private String content;
    private int score;
    private int likeCount;
    private int exam;

    public ReviewListItem(ReviewListViewEntity reviewListViewEntity){
        this.reviewNumber = reviewListViewEntity.getReviewNumber();
        this.username = reviewListViewEntity.getUsername();
        this.courseName = reviewListViewEntity.getCourseName();
        this.date = timeChanger(reviewListViewEntity.getWriteDatetime());
        this.difficulty = reviewListViewEntity.getDifficulty();
        this.workload = reviewListViewEntity.getWorkload();
        this.enjoyable = reviewListViewEntity.getEnjoyable();
        this.quality = reviewListViewEntity.getQuality();
        this.takenSemester = reviewListViewEntity.getTakenSemester();
        this.content = reviewListViewEntity.getContent();
        this.score = reviewListViewEntity.getScore();
        this.likeCount = reviewListViewEntity.getLikeCount();
        this.exam = reviewListViewEntity.getExam();
    }

    private String timeChanger(String time) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        ZoneId aucklandZone = ZoneId.of("Pacific/Auckland");

        LocalDateTime localDateTime = LocalDateTime.parse(time, inputFormatter);
        ZonedDateTime zonedDateTime = localDateTime.atZone(aucklandZone);

        return zonedDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
}

package com.quad.quad_back.dto.object;

import com.quad.quad_back.entity.ReviewListViewEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HighLightReviewListItem {
    private Integer reviewNumber;
    private String courseName;
    private String username;
    private Integer rate;
    private String time;
    private Integer likeCount;
    private String content;
    private Integer exam;
    private Integer takenSemester;

    public HighLightReviewListItem(ReviewListViewEntity ReviewListViewEntity){
        this.reviewNumber = ReviewListViewEntity.getReviewNumber();
        this.courseName = ReviewListViewEntity.getCourseName();
        this.username = ReviewListViewEntity.getUsername();
        this.rate = ReviewListViewEntity.getScore();
        this.time = timeChanger(ReviewListViewEntity.getWriteDatetime());
        this.likeCount = ReviewListViewEntity.getLikeCount();
        this.content = ReviewListViewEntity.getContent();
        this.exam = ReviewListViewEntity.getExam();
        this.takenSemester = ReviewListViewEntity.getTakenSemester();
    }

    public static List<HighLightReviewListItem> getList(List<ReviewListViewEntity> reviewListViewEntities){
        List<HighLightReviewListItem> list = new ArrayList<>();
        for(ReviewListViewEntity reviewListViewEntity: reviewListViewEntities){
            HighLightReviewListItem reviewListItem = new HighLightReviewListItem(reviewListViewEntity);
            list.add(reviewListItem);
        }
        return list;
    }

    private String timeChanger(String time) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        ZoneId aucklandZone = ZoneId.of("Pacific/Auckland");
        LocalDateTime localDateTime = LocalDateTime.parse(time, inputFormatter);
        ZonedDateTime zonedDateTime = localDateTime.atZone(aucklandZone);

        ZonedDateTime now = ZonedDateTime.now(aucklandZone);

        long minutes = java.time.Duration.between(zonedDateTime, now).toMinutes();
        long hours = java.time.Duration.between(zonedDateTime, now).toHours();
        long days = java.time.Duration.between(zonedDateTime, now).toDays();
        long weeks = days / 7;
        long months = java.time.Period.between(zonedDateTime.toLocalDate(), now.toLocalDate()).toTotalMonths();

        if (minutes < 1) {
            return "A minute ago";
        } else if (minutes < 60) {
            return minutes == 1 ? "A minute ago" : minutes + " minutes ago";
        } else if (hours < 2) {
            return "An hour ago";
        } else if (hours < 24) {
            return hours + " hours ago";
        } else if (days == 0) {
            return "Today";
        } else if (days == 1) {
            return "Yesterday";
        } else if (days < 7) {
            return days + " days ago";
        } else if (weeks == 1) {
            return "Last week";
        } else if (weeks < 5) {
            return weeks + " weeks ago";
        } else if (months == 1) {
            return "Last month";
        } else if (months < 4) {
            return months + " months ago";
        } else {
            DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd MMM yyyy");
            return zonedDateTime.format(outputFormatter);
        }
    }
}

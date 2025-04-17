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
    private Double rate;
    private String time;
    private Integer likeCount;
    private String content;

    public HighLightReviewListItem(ReviewListViewEntity ReviewListViewEntity){
        this.reviewNumber = ReviewListViewEntity.getReviewNumber();
        this.courseName = ReviewListViewEntity.getCourseName();
        this.rate = rateCalculation(
            ReviewListViewEntity.getDifficulty(),
            ReviewListViewEntity.getEntertaining(),
            ReviewListViewEntity.getLeniency(),
            ReviewListViewEntity.getQuality()
        );
        this.time = timeChanger(ReviewListViewEntity.getWriteDatetime());
        this.likeCount = ReviewListViewEntity.getLikeCount();
        this.content = ReviewListViewEntity.getContent();
    }

    public static List<HighLightReviewListItem> getList(List<ReviewListViewEntity> reviewListViewEntities){
        List<HighLightReviewListItem> list = new ArrayList<>();
        for(ReviewListViewEntity reviewListViewEntity: reviewListViewEntities){
            HighLightReviewListItem reviewListItem = new HighLightReviewListItem(reviewListViewEntity);
            list.add(reviewListItem);
        }
        return list;
    }

    private double rateCalculation(int a, int b, int c, int d){
        int sum = a + b + c + d;
        return sum / 4.0;
    }

    private String timeChanger(String time) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        ZoneId aucklandZone = ZoneId.of("Pacific/Auckland");

        LocalDateTime localDateTime = LocalDateTime.parse(time, inputFormatter);
        ZonedDateTime zonedDateTime = localDateTime.atZone(aucklandZone);

        LocalDate today = ZonedDateTime.now(aucklandZone).toLocalDate();

        if (zonedDateTime.toLocalDate().isEqual(today)) {
            return zonedDateTime.format(DateTimeFormatter.ofPattern("HH:mm"));
        } else {
            return zonedDateTime.format(DateTimeFormatter.ofPattern("d MMM"));
        }
    }
}

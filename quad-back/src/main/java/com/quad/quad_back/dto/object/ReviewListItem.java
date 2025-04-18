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
    private String username;
    private String date;
    private Integer noExam;
    private int difficulty;
    private int leniency;
    private int entertaining;
    private int quality;
    private String content;
    private String faculty;

    public ReviewListItem(ReviewListViewEntity reviewListViewEntity){
        this.username = reviewListViewEntity.getUsername();
        this.date = timeChanger(reviewListViewEntity.getWriteDatetime());
        this.noExam = reviewListViewEntity.getNoExam();
        this.difficulty = reviewListViewEntity.getDifficulty();
        this.leniency = reviewListViewEntity.getLeniency();
        this.entertaining = reviewListViewEntity.getEntertaining();
        this.quality = reviewListViewEntity.getQuality();
        this.content = reviewListViewEntity.getContent();
        this.faculty = reviewListViewEntity.getFaculty();
        
    }

    // public static Map<String, List<ReviewListItem>> groupByFaculty(List<ReviewListViewEntity> entities) {
    // Map<String, List<ReviewListItem>> result = new HashMap<>();

    // for (ReviewListViewEntity entity : entities) {
    //     String faculty = entity.getFaculty();
    //     ReviewListItem item = new ReviewListItem(entity);
    //     result.computeIfAbsent(faculty, k -> new ArrayList<>()).add(item);
    // }

    // return result;
    // }

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

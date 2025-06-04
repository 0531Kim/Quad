package com.quad.quad_back.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quad.quad_back.entity.CourseEntity;
import com.quad.quad_back.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Component
@RequiredArgsConstructor
public class CourseJsonUpdater implements CommandLineRunner {
    private final CourseRepository courseRepository;
    
    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream input = getClass().getClassLoader().getResourceAsStream("course-data.json");
        
        List<Map<String, String>> courseData = mapper.readValue(input, new TypeReference<>() {});
        
        Map<String, String> codeToTitle = new HashMap<>();
        for (Map<String, String> course : courseData) {
            String code = course.get("courseCode");
            String title = course.get("title");
            if (code != null && title != null) {
                codeToTitle.put(code, title);
            }
        }
        
        List<CourseEntity> courses = courseRepository.findAll();
        int updatedCount = 0;
        for (CourseEntity course : courses) {
            if (codeToTitle.containsKey(course.getStudyName())) {
                course.setStudyTitle(codeToTitle.get(course.getStudyName()));
                updatedCount++;
            }
        }
        
        courseRepository.saveAll(courses);
    }
}
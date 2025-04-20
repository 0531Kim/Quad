package com.quad.quad_back.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.quad.quad_back.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CacheWarmupRunner {

    private final ReviewService reviewService;

    @EventListener(ApplicationReadyEvent.class)
    public void warmupCache() {
        reviewService.getAllStudiesMap();
    }
}
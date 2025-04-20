package com.quad.quad_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class QuadBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuadBackApplication.class, args);
	}

}

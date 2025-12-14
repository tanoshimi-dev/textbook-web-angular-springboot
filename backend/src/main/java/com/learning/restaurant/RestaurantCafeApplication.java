package com.learning.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestaurantCafeApplication {

    public static void main(String[] args) {
        // Hot Reaload Test
        System.out.println("V8 ☕　Restaurant & Café - Hot Reload Working!");
        SpringApplication.run(RestaurantCafeApplication.class, args);
    }
}

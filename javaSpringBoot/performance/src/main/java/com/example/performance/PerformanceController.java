package com.example.performance;

import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PerformanceController{
    @RequestMapping("/")
    public String hello(){
        return "hello world";
    }
}


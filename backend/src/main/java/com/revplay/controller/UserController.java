package com.revplay.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/dashboard")
    public String userDashboard() {
        return "User Dashboard Access Granted";
    }
}
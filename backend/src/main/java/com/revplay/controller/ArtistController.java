package com.revplay.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artist")
public class ArtistController {

    @GetMapping("/dashboard")
    public String artistDashboard() {
        return "Artist Dashboard Access Granted";
    }
}
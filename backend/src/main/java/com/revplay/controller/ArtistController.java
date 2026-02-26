package com.revplay.controller;

import com.revplay.dto.ArtistProfileDTO;
import com.revplay.service.ArtistService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/music")
public class ArtistController {

    private final ArtistService artistService;
    ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }



    @GetMapping("/artists/{id}")
    public ArtistProfileDTO getArtistProfile(@PathVariable Long id) {

        log.info("Incoming request for artist profile: {}", id);

        return artistService.getArtistProfile(id);
    }
}
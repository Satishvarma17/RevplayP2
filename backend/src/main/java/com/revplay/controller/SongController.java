package com.revplay.controller;

import com.revplay.dto.request.SongUploadRequest;
import com.revplay.dto.response.SongResponse;
import com.revplay.service.SongService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:4200")
public class SongController {

    private static final Logger log = LoggerFactory.getLogger(SongController.class);
    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @PostMapping("/upload")
    public SongResponse uploadSong(@Valid @RequestBody SongUploadRequest request) {
        log.info("Song upload request received. title={}", request.getTitle());
        return songService.uploadSong(request);
    }

    @GetMapping()
    public List<SongResponse> getAllSongs() {
        log.info("Get all songs request received");
        return songService.getAllSongs();
    }
}

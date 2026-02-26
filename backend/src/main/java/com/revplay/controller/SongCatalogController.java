package com.revplay.controller;

import com.revplay.dto.response.ApiResponse;
import com.revplay.dto.response.SongResponse;
import com.revplay.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongCatalogController {

    private final SongService songService;

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<List<SongResponse>>> getPublicSongs() {
        List<SongResponse> songs = songService.getPublicSongs();
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Public songs fetched successfully", songs)
        );
    }
}

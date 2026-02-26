package com.revplay.controller;

import com.revplay.dto.AlbumDetailsDTO;
import com.revplay.dto.SongDTO;
import com.revplay.service.SongService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/music")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @GetMapping("/songs")
    public Page<SongDTO> getSongs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String album,
            @RequestParam(required = false) Integer releaseYear,
            @RequestParam(defaultValue = "title,asc") String sort
    ) {

        log.info("Incoming request to fetch songs");

        return songService.getAllSongs(page, size, title, genre, album, releaseYear, sort);
    }

    @GetMapping("/songs/{id}")
    public SongDTO getSongById(@PathVariable Long id) {

        log.info("Incoming request to fetch song with ID: {}", id);

        return songService.getSongById(id);
    }

    @GetMapping("/albums/{id}")
    public AlbumDetailsDTO getAlbumById(@PathVariable Long id) {
        log.info("Incoming request to fetch album with ID: {}", id);
        return songService.getAlbumById(id);
    }

    @GetMapping("/search")
    public Map<String, Object> search(@RequestParam String keyword) {

        log.info("Incoming search request with keyword: {}", keyword);

        return songService.globalSearch(keyword);
    }
}

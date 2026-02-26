package com.revplay.service.impl;

import com.revplay.dto.request.SongUploadRequest;
import com.revplay.dto.response.SongResponse;
import com.revplay.entity.Song;
import com.revplay.repository.SongRepository;
import com.revplay.service.SongService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongServiceImpl implements SongService {

    private static final Logger log = LoggerFactory.getLogger(SongServiceImpl.class);
    private final SongRepository songRepository;

    public SongServiceImpl(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @Override
    public SongResponse uploadSong(SongUploadRequest request) {
        Song song = new Song();
        song.setTitle(request.getTitle());
        song.setFilename(request.getFilename());
        song.setUrl(request.getUrl());

        Song saved = songRepository.save(song);
        log.info("Song uploaded successfully. songId={}, title={}", saved.getId(), saved.getTitle());
        return new SongResponse(saved.getId(), saved.getTitle(), saved.getUrl());
    }

    @Override
    public List<SongResponse> getAllSongs() {
        List<SongResponse> songs = songRepository.findAll()
                .stream()
                .map(s -> new SongResponse(s.getId(), s.getTitle(), s.getUrl()))
                .toList();
        log.info("Fetched songs. count={}", songs.size());
        return songs;
    }
}

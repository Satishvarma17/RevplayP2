package com.revplay.service;

import com.revplay.dto.AlbumDetailsDTO;
import com.revplay.dto.SongDTO;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface SongService {

    Page<SongDTO> getAllSongs(int page,
                              int size,
                              String title,
                              String genre,
                              String album,
                              Integer releaseYear,
                              String sort);

    SongDTO getSongById(Long id);

    AlbumDetailsDTO getAlbumById(Long id);

    Map<String, Object> globalSearch(String keyword);
}

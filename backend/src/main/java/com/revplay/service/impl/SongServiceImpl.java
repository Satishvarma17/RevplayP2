package com.revplay.service.impl;

import com.revplay.dto.AlbumDetailsDTO;
import com.revplay.dto.SongDTO;
import com.revplay.entity.Album;
import com.revplay.entity.Song;
import com.revplay.exception.ResourceNotFoundException;
import com.revplay.repository.AlbumRepository;
import com.revplay.repository.ArtistRepository;
import com.revplay.repository.SongRepository;
import com.revplay.service.SongService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;

    @Override
    public Page<SongDTO> getAllSongs(int page,
                                     int size,
                                     String title,
                                     String genre,
                                     String album,
                                     Integer releaseYear,
                                     String sort) {

        log.info("Fetching songs - page: {}, size: {}, title: {}, genre: {}, album: {}, releaseYear: {}, sort: {}",
                page, size, title, genre, album, releaseYear, sort);

        String[] sortParts = sort.split(",");
        String sortBy = sortParts.length > 0 ? sortParts[0] : "title";
        String direction = sortParts.length > 1 ? sortParts[1] : "asc";

        Sort order = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, order);

        Page<Song> songs = songRepository.findSongsWithFilters(
                isBlank(title) ? null : title,
                isBlank(genre) ? null : genre,
                isBlank(album) ? null : album,
                releaseYear,
                pageable
        );

        log.info("Total songs found: {}", songs.getTotalElements());

        return songs.map(this::convertToDTO);
    }

    @Override
    public SongDTO getSongById(Long id) {

        log.info("Fetching song with ID: {}", id);

        Song song = songRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Song not found with ID: {}", id);
                    return new ResourceNotFoundException("Song not found with id: " + id);
                });

        return convertToDTO(song);
    }

    @Override
    public AlbumDetailsDTO getAlbumById(Long id) {

        log.info("Fetching album with ID: {}", id);

        Album album = albumRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Album not found with ID: {}", id);
                    return new ResourceNotFoundException("Album not found with id: " + id);
                });

        List<SongDTO> songs = album.getSongs().stream()
                .map(this::convertToDTO)
                .toList();

        return new AlbumDetailsDTO(
                album.getId(),
                album.getName(),
                album.getReleaseDate(),
                album.getArtist() != null ? album.getArtist().getName() : null,
                songs
        );
    }

    @Override
    public Map<String, Object> globalSearch(String keyword) {

        log.info("Performing global search for keyword: {}", keyword);

        Map<String, Object> result = new HashMap<>();

        List<SongDTO> songResults = songRepository.advancedSearch(keyword)
                .stream()
                .map(this::convertToDTO)
                .toList();

        List<Map<String, Object>> artistResults = artistRepository.advancedSearch(keyword)
                .stream()
                .map(artist -> {
                    Map<String, Object> dto = new HashMap<>();
                    dto.put("id", artist.getId());
                    dto.put("name", artist.getName());
                    dto.put("genre", artist.getGenre());
                    return dto;
                })
                .toList();

        List<Map<String, Object>> albumResults = albumRepository.advancedSearch(keyword)
                .stream()
                .map(album -> {
                    Map<String, Object> dto = new HashMap<>();
                    dto.put("id", album.getId());
                    dto.put("name", album.getName());
                    dto.put("releaseDate", album.getReleaseDate());
                    return dto;
                })
                .toList();

        result.put("songs", songResults);
        result.put("artists", artistResults);
        result.put("albums", albumResults);

        log.info("Search completed. Songs found: {}", songResults.size());

        return result;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private SongDTO convertToDTO(Song song) {

        return new SongDTO(
                song.getId(),
                song.getTitle(),
                song.getGenre(),
                song.getDuration(),
                song.getReleaseDate(),
                song.getArtist() != null ? song.getArtist().getId() : null,
                song.getArtist() != null ? song.getArtist().getName() : null,
                song.getAlbum() != null ? song.getAlbum().getId() : null,
                song.getAlbum() != null ? song.getAlbum().getName() : null
        );
    }
}

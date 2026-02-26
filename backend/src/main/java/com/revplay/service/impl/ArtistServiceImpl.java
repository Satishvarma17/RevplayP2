package com.revplay.service.impl;


import com.revplay.dto.AlbumDTO;
import com.revplay.dto.ArtistProfileDTO;
import com.revplay.dto.SongDTO;
import com.revplay.entity.Artist;
import com.revplay.exception.ResourceNotFoundException;
import com.revplay.repository.ArtistRepository;
import com.revplay.service.ArtistService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArtistServiceImpl implements ArtistService {

    private final ArtistRepository artistRepository;

    @Override
    public ArtistProfileDTO getArtistProfile(Long id) {

        log.info("Fetching artist profile with ID: {}", id);

        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Artist not found with ID: {}", id);
                    return new ResourceNotFoundException("Artist not found");
                });

        List<AlbumDTO> albums = artist.getAlbums().stream()
                .map(album -> new AlbumDTO(
                        album.getId(),
                        album.getName(),
                        album.getReleaseDate(),
                        album.getSongs().stream()
                                .map(song -> new SongDTO(
                                        song.getId(),
                                        song.getTitle(),
                                        song.getGenre(),
                                        song.getDuration(),
                                        song.getReleaseDate(),
                                        artist.getId(),
                                        artist.getName(),
                                        album.getId(),
                                        album.getName()
                                ))
                                .toList()
                ))
                .toList();

        return new ArtistProfileDTO(
                artist.getId(),
                artist.getName(),
                artist.getBio(),
                artist.getGenre(),
                albums
        );
    }
}

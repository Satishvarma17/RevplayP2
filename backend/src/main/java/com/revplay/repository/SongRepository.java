package com.revplay.repository;

import com.revplay.entity.Song;
import com.revplay.entity.Visibility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {

    // Get all songs by an artist
    List<Song> findByArtistId(Long artistId);

    // Get songs by visibility (PUBLIC / UNLISTED)
    List<Song> findByVisibility(Visibility visibility);


    // Get songs by artist and visibility
    List<Song> findByArtistIdAndVisibility(Long artistId, Visibility visibility);

    // Count songs in a specific album
    long countByAlbumId(Long albumId);
}
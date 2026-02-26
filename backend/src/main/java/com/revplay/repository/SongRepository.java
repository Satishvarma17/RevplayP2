package com.revplay.repository;

import com.revplay.entity.Song;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface SongRepository extends JpaRepository<Song, Long>{

    @Query("""
        SELECT s FROM Song s
        WHERE (:title IS NULL OR LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%')))
          AND (:genre IS NULL OR LOWER(s.genre) = LOWER(:genre))
          AND (:album IS NULL OR LOWER(s.album.name) LIKE LOWER(CONCAT('%', :album, '%')))
          AND (:releaseYear IS NULL OR FUNCTION('YEAR', s.releaseDate) = :releaseYear)
    """)
    Page<Song> findSongsWithFilters(@Param("title") String title,
                                    @Param("genre") String genre,
                                    @Param("album") String album,
                                    @Param("releaseYear") Integer releaseYear,
                                    Pageable pageable);

    @Query("""
        SELECT s FROM Song s
        WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(s.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(s.artist.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(s.album.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Song> advancedSearch(String keyword);

}

package com.revplay.repository;

import com.revplay.entity.Artist;
import org.springframework.data.jpa.repository.*;
import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    @Query("""
    SELECT a FROM Artist a
    WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Artist> advancedSearch(String keyword);
}
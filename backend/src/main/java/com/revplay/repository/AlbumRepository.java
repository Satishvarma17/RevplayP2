package com.revplay.repository;

import com.revplay.entity.Album;
import org.springframework.data.jpa.repository.*;
import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("""
    SELECT a FROM Album a
    WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Album> advancedSearch(String keyword);
}
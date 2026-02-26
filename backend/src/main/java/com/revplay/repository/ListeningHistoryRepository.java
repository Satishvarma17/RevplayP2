package com.revplay.repository;

import com.revplay.entity.ListeningHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ListeningHistoryRepository
        extends JpaRepository<ListeningHistory, Long> {

    @Query("""
            SELECT h.listenedDate, COUNT(h.id)
            FROM ListeningHistory h
            WHERE h.song.artist.id = :artistId
            GROUP BY h.listenedDate
            ORDER BY h.listenedDate
            """)
    List<Object[]> getDailyTrends(@Param("artistId") Long artistId);

    @Query("""
            SELECT h.listenerName, COUNT(h.id)
            FROM ListeningHistory h
            WHERE h.song.artist.id = :artistId
              AND h.listenerName IS NOT NULL
              AND h.listenerName <> ''
            GROUP BY h.listenerName
            ORDER BY COUNT(h.id) DESC
            """)
    List<Object[]> getTopListeners(@Param("artistId") Long artistId);
}

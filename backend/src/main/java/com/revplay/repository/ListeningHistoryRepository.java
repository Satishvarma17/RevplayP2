package com.revplay.repository;

import com.revplay.entity.ListeningHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListeningHistoryRepository extends JpaRepository<ListeningHistory, Long> {

    List<ListeningHistory> findByUserIdOrderByPlayedAtDesc(Long userId, Pageable pageable);

    long countByUserId(Long userId);

    void deleteByUserId(Long userId);
}

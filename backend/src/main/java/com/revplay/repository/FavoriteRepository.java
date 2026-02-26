package com.revplay.repository;

import com.revplay.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    long countBySongId(Long songId);
}
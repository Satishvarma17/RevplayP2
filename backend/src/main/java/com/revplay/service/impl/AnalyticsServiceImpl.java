package com.revplay.service.impl;

import com.revplay.dto.response.SongResponse;
import com.revplay.dto.response.TopListenerResponse;
import com.revplay.dto.response.TrendResponse;
import com.revplay.entity.Song;
import com.revplay.repository.*;
import com.revplay.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.time.temporal.IsoFields;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final SongRepository songRepository;
    private final FavoriteRepository favoriteRepository;
    private final ListeningHistoryRepository historyRepository;

    @Override
    public Map<String, Long> getOverview(Long artistId) {

        List<Song> songs = songRepository.findByArtistId(artistId);

        long totalSongs = songs.size();
        long totalPlays = songs.stream()
                .mapToLong(Song::getPlayCount)
                .sum();

        long totalFavorites = songs.stream()
                .mapToLong(song -> favoriteRepository.countBySongId(song.getId()))
                .sum();

        Map<String, Long> result = new HashMap<>();
        result.put("totalSongs", totalSongs);
        result.put("totalPlays", totalPlays);
        result.put("totalFavorites", totalFavorites);

        return result;
    }

    @Override
    public List<SongResponse> getSongPerformance(Long artistId) {

        return songRepository.findByArtistId(artistId)
                .stream()
                .map(song -> new SongResponse(
                        song.getId(),
                        song.getTitle(),
                        song.getPlayCount(),
                        favoriteRepository.countBySongId(song.getId())
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<TrendResponse> getListeningTrends(Long artistId, String type) {
        List<Object[]> rawData = historyRepository.getDailyTrends(artistId);
        Map<String, Long> grouped = new LinkedHashMap<>();
        String normalizedType = type == null ? "monthly" : type.toLowerCase();

        for (Object[] obj : rawData) {
            LocalDate date = (LocalDate) obj[0];
            long count = ((Number) obj[1]).longValue();
            String key;

            switch (normalizedType) {
                case "weekly":
                    key = date.getYear() + "-W" + String.format("%02d", date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
                    break;
                case "monthly":
                    key = date.format(DateTimeFormatter.ofPattern("yyyy-MM"));
                    break;
                default:
                    key = date.toString();
            }

            grouped.put(key, grouped.getOrDefault(key, 0L) + count);
        }

        return grouped.entrySet().stream()
                .map(e -> new TrendResponse(e.getKey(), e.getValue()))
                .toList();
    }

    @Override
    public List<SongResponse> getTopSongs(Long artistId) {

        return songRepository.findByArtistIdOrderByPlayCountDesc(artistId)
                .stream()
                .map(song -> new SongResponse(
                        song.getId(),
                        song.getTitle(),
                        song.getPlayCount(),
                        favoriteRepository.countBySongId(song.getId())
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<TopListenerResponse> getTopListeners(Long artistId) {
        return historyRepository.getTopListeners(artistId).stream()
                .map(row -> new TopListenerResponse(
                        String.valueOf(row[0]),
                        ((Number) row[1]).longValue()
                ))
                .toList();
    }
}

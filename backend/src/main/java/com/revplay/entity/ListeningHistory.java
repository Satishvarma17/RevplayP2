package com.revplay.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "listening_history")
public class ListeningHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id", nullable = false)
    private Song song;

    @Column(nullable = false)
    private LocalDateTime playedAt;

    public ListeningHistory() {
    }

    public ListeningHistory(Long id, Long userId, Song song, LocalDateTime playedAt) {
        this.id = id;
        this.userId = userId;
        this.song = song;
        this.playedAt = playedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public LocalDateTime getPlayedAt() {
        return playedAt;
    }

    public void setPlayedAt(LocalDateTime playedAt) {
        this.playedAt = playedAt;
    }
}

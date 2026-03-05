package com.revplay.controller;

import com.revplay.dto.request.PlaylistCreateRequest;
import com.revplay.dto.request.PlaylistUpdateRequest;
import com.revplay.dto.response.PlaylistResponse;
import com.revplay.service.PlaylistService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping
    public ResponseEntity<PlaylistResponse> createPlaylist(
            @RequestParam String username,
            @RequestBody PlaylistCreateRequest request) {
        String normalizedUsername = resolveUsername(username);
        String name = request.getName() == null ? "" : request.getName().trim();
        if (name.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Playlist name is required");
        }

        return ResponseEntity.ok(
                playlistService.createPlaylist(normalizedUsername, name, request.getDescription())
        );
    }

    @GetMapping
    public ResponseEntity<List<PlaylistResponse>> getPlaylists(
            @RequestParam String username) {
        return ResponseEntity.ok(playlistService.getUserPlaylists(resolveUsername(username)));
    }

    @PutMapping("/{playlistId}")
    public ResponseEntity<PlaylistResponse> updatePlaylist(
            @RequestParam String username,
            @PathVariable Long playlistId,
            @RequestBody PlaylistUpdateRequest request) {
        return ResponseEntity.ok(
                playlistService.updatePlaylist(resolveUsername(username), playlistId, request.getName(), request.getDescription())
        );
    }

    @DeleteMapping("/{playlistId}")
    public ResponseEntity<Void> deletePlaylist(
            @RequestParam String username,
            @PathVariable Long playlistId) {
        playlistService.deletePlaylist(resolveUsername(username), playlistId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<PlaylistResponse> addSong(
            @RequestParam String username,
            @PathVariable Long playlistId,
            @PathVariable Long songId) {
        if (songId == null || songId <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Song ID must be positive");
        }
        return ResponseEntity.ok(playlistService.addSong(resolveUsername(username), playlistId, songId));
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<PlaylistResponse> removeSong(
            @RequestParam String username,
            @PathVariable Long playlistId,
            @PathVariable Long songId) {
        return ResponseEntity.ok(playlistService.removeSong(resolveUsername(username), playlistId, songId));
    }

    private String resolveUsername(String username) {
        if (username != null && !username.trim().isEmpty()) {
            return username.trim();
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String principalName = authentication.getName();
            if (principalName != null
                    && !principalName.trim().isEmpty()
                    && !"anonymousUser".equalsIgnoreCase(principalName.trim())) {
                return principalName.trim();
            }
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Username is required");
    }
}

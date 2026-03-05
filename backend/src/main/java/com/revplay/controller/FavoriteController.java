package com.revplay.controller;

import com.revplay.service.FavoriteService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/{songId}")
    public ResponseEntity<String> addFavorite(
            @PathVariable Long songId,
            @RequestParam String username) {
        favoriteService.addFavorite(resolveUsername(username), songId);
        return ResponseEntity.ok("Added");
    }

    @DeleteMapping("/{songId}")
    public ResponseEntity<String> removeFavorite(
            @PathVariable Long songId,
            @RequestParam String username) {
        favoriteService.removeFavorite(resolveUsername(username), songId);
        return ResponseEntity.ok("Removed");
    }

    @GetMapping
    public ResponseEntity<?> getFavorites(
            @RequestParam String username) {
        return ResponseEntity.ok(
                favoriteService.getFavorites(resolveUsername(username))
        );
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

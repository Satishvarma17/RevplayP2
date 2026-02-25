package com.revplay.service.impl;

import com.revplay.dto.request.UserProfileUpdateRequest;
import com.revplay.dto.response.UserProfileResponse;
import com.revplay.dto.response.UserStatsResponse;
import com.revplay.entity.User;
import com.revplay.repository.FavoriteRepository;
import com.revplay.repository.PlaylistRepository;
import com.revplay.repository.UserRepository;
import com.revplay.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final FavoriteRepository favoriteRepository;

    public UserServiceImpl(UserRepository userRepository,
                           PlaylistRepository playlistRepository,
                           FavoriteRepository favoriteRepository) {
        this.userRepository = userRepository;
        this.playlistRepository = playlistRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @Override
    public UserProfileResponse getProfile(String username) {
        User user = getOrCreateUser(username);
        return new UserProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getDisplayName(),
                user.getBio(),
                user.getProfileImage()
        );
    }

    @Override
    public UserProfileResponse updateProfile(String username, UserProfileUpdateRequest updatedUser) {
        User user = getOrCreateUser(username);

        user.setDisplayName(updatedUser.getDisplayName());
        user.setBio(updatedUser.getBio());
        user.setProfileImage(updatedUser.getProfileImage());
        User saved = userRepository.save(user);

        return new UserProfileResponse(
                saved.getUsername(),
                saved.getEmail(),
                saved.getDisplayName(),
                saved.getBio(),
                saved.getProfileImage()
        );
    }

    @Override
    public UserStatsResponse getStats(String username) {
        User user = getOrCreateUser(username);
        long totalPlaylists = playlistRepository.countByUser(user);
        long totalFavorites = favoriteRepository.countByUser(user);

        // Placeholder for Module 6 integration
        long totalListeningMinutes = 125;
        return new UserStatsResponse(totalPlaylists, totalFavorites, totalListeningMinutes);
    }

    private User getOrCreateUser(String username) {
        java.util.List<User> users = userRepository.findAllByUsernameOrderByIdAsc(username);
        if (!users.isEmpty()) {
            return users.get(0);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(username + "@revplay.local");
        user.setPassword("placeholder");
        user.setDisplayName("New Listener");
        user.setBio("Add your bio");
        user.setProfileImage("https://placehold.co/120x120");
        return userRepository.save(user);
    }
}

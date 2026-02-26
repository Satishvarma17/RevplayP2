package com.revplay.service;

import com.revplay.dto.ArtistProfileDTO;

public interface ArtistService {

    ArtistProfileDTO getArtistProfile(Long id);
}
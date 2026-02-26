package com.revplay.service;

import com.revplay.dto.request.SongUploadRequest;
import com.revplay.dto.response.SongResponse;
import java.util.List;

public interface SongService {
    SongResponse uploadSong(SongUploadRequest request);
    List<SongResponse> getAllSongs();
}
package com.revplay.dto.request;

import jakarta.validation.constraints.NotBlank;

public class SongUploadRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String filename;
    @NotBlank
    private String url;

    public SongUploadRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

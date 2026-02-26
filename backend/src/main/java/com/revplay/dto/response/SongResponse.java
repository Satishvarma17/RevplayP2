package com.revplay.dto.response;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
public class SongResponse {

    private Long id;
    private String title;
    private Long playCount;
    private Long favoriteCount;
}
package com.revplay.dto.response;
import com.revplay.entity.Visibility;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SongResponse {

    private Long id;
    private String title;
    private String genre;
    private Integer duration;

    private Visibility visibility;

    private String artistName;
    private String albumName;
    private Long albumId;

    private LocalDateTime createdAt;
}
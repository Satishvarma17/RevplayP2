package com.revplay.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Long playCount = 0L;

    @ManyToOne
    private Artist artist;

    @OneToMany(mappedBy = "song")
    private List<Favorite> favorites;
}
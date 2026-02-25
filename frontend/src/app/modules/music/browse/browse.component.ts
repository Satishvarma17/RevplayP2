import { Component, OnInit } from '@angular/core';
import { SONG_CATALOG, Song } from 'src/app/core/data/song-catalog';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  songs: Array<Song & { isFavorite: boolean }> = SONG_CATALOG.map(song => ({
    ...song,
    isFavorite: false
  }));
  processingSongIds = new Set<number>();

  constructor(
    private favoriteService: FavoriteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.get().subscribe((favorites) => {
      const favoriteSet = new Set(favorites);
      this.songs = this.songs.map(song => ({
        ...song,
        isFavorite: favoriteSet.has(song.id)
      }));
    });
  }

  private setFavorite(songId: number, favorite: boolean): void {
    this.songs = this.songs.map(song =>
      song.id === songId ? { ...song, isFavorite: favorite } : song
    );
  }

  toggleFavorite(song: Song & { isFavorite: boolean }): void {
    const songId = song.id;
    if (this.processingSongIds.has(songId)) {
      return;
    }

    const currentlyFavorite = song.isFavorite;
    this.processingSongIds.add(songId);

    if (currentlyFavorite) {
      this.setFavorite(songId, false);
      this.favoriteService.remove(songId).subscribe({
        next: () => {
          this.userService.notifyStatsChanged();
          this.processingSongIds.delete(songId);
        },
        error: (err) => {
          console.error('Failed to remove favorite', err);
          this.processingSongIds.delete(songId);
        }
      });
      return;
    }

    this.setFavorite(songId, true);
    this.favoriteService.add(songId).subscribe({
      next: () => {
        this.userService.notifyStatsChanged();
        this.processingSongIds.delete(songId);
      },
      error: (err) => {
        console.error('Failed to add favorite', err);
        this.processingSongIds.delete(songId);
      }
    });
  }
}

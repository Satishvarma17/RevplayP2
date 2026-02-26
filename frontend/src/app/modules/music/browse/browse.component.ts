import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { LibrarySong, SongLibraryService } from 'src/app/core/services/song-library.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  songs: Array<LibrarySong & { isFavorite: boolean }> = [];
  processingSongIds = new Set<number>();

  constructor(
    private songLibraryService: SongLibraryService,
    private favoriteService: FavoriteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.songLibraryService.getPublicSongs().subscribe((songs) => {
      this.songs = songs.map((song) => ({ ...song, isFavorite: false }));
      this.loadFavorites();
    });
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

  toggleFavorite(song: LibrarySong & { isFavorite: boolean }): void {
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

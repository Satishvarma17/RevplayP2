import { Component, OnInit } from '@angular/core';
import { getSongById } from 'src/app/core/data/song-catalog';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Array<{ id: number; title: string; artist: string }> = [];

  constructor(
    private favoriteService: FavoriteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteService.get().subscribe(songIds => {
      this.favorites = songIds.map((songId) => {
        const song = getSongById(songId);
        if (song) {
          return song;
        }

        return {
          id: songId,
          title: `Unknown Song (${songId})`,
          artist: 'Unknown Artist'
        };
      });
    });
  }

  remove(songId: number) {
    const previousFavorites = [...this.favorites];
    this.favorites = this.favorites.filter(song => song.id !== songId);

    this.favoriteService.remove(songId).subscribe({
      next: () => {
        this.userService.notifyStatsChanged();
      },
      error: (err) => {
        console.error('Failed to remove favorite', err);
        this.favorites = previousFavorites;
        this.loadFavorites();
      }
    });
  }
}

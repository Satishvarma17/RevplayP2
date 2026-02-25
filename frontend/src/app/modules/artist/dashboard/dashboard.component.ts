<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  songs: any[] = [];
  totalSongs: number = 0;
  totalAlbums: number = 0;

  artistId = Number(localStorage.getItem("artistId"));

  constructor(
    private songService: SongService,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
    this.loadAlbums();
  }

  // 🔹 Load Songs (for overview only)
  loadSongs() {
    this.songService.getSongs(this.artistId)
      .subscribe({
        next: (res: any) => {
          this.songs = res.data || [];
          this.totalSongs = this.songs.length;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  // 🔹 Load Albums (for overview only)
  loadAlbums() {
    this.albumService.getAlbums(this.artistId)
      .subscribe({
        next: (res: any) => {
          this.totalAlbums = res.data ? res.data.length : 0;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

}
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home/login']);
  }
}
>>>>>>> origin/develop

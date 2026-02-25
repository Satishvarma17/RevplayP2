import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Playlist {
  id: number;
  name: string;
  description: string;
  songIds: number[];
}

@Injectable({ providedIn: 'root' })
export class PlaylistService {

  private baseUrl = 'http://localhost:8080/api/playlists';

  constructor(private http: HttpClient) {}

  create(data: { name: string; description: string }, username: string = this.getUsername()): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.baseUrl}?username=${encodeURIComponent(username)}`, data);
  }

  getAll(username: string = this.getUsername()): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.baseUrl}?username=${encodeURIComponent(username)}`);
  }

  update(playlistId: number, data: { name: string; description: string }, username: string = this.getUsername()): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.baseUrl}/${playlistId}?username=${encodeURIComponent(username)}`, data);
  }

  delete(playlistId: number, username: string = this.getUsername()) {
    return this.http.delete(`${this.baseUrl}/${playlistId}?username=${encodeURIComponent(username)}`);
  }

  addSong(playlistId: number, songId: number, username: string = this.getUsername()): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.baseUrl}/${playlistId}/songs/${songId}?username=${encodeURIComponent(username)}`, {});
  }

  removeSong(playlistId: number, songId: number, username: string = this.getUsername()): Observable<Playlist> {
    return this.http.delete<Playlist>(`${this.baseUrl}/${playlistId}/songs/${songId}?username=${encodeURIComponent(username)}`);
  }

  private getUsername(): string {
    const username = localStorage.getItem('username') || localStorage.getItem('identifier') || 'satish';
    if (!localStorage.getItem('username') && username) {
      localStorage.setItem('username', username);
    }
    return username.trim();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FavoriteService {

  private baseUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) {}

  add(songId: number, username: string = this.getUsername()) {
    return this.http.post(`${this.baseUrl}/${songId}?username=${encodeURIComponent(username)}`, {});
  }

  remove(songId: number, username: string = this.getUsername()) {
    return this.http.delete(`${this.baseUrl}/${songId}?username=${encodeURIComponent(username)}`);
  }

  get(username: string = this.getUsername()) {
    return this.http.get<number[]>(`${this.baseUrl}?username=${encodeURIComponent(username)}`);
  }

  private getUsername(): string {
    const username = localStorage.getItem('username') || localStorage.getItem('identifier') || 'satish';
    if (!localStorage.getItem('username') && username) {
      localStorage.setItem('username', username);
    }
    return username.trim();
  }
}

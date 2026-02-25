import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface UserProfile {
  username: string;
  email: string;
  displayName: string;
  bio: string;
  profileImage: string;
}

export interface UserProfileUpdate {
  displayName: string;
  bio: string;
  profileImage: string;
}

export interface UserStats {
  totalPlaylists: number;
  totalFavorites: number;
  totalListeningMinutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';
  private statsChangedSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getProfile(username: string = this.getUsername()): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/profile?username=${encodeURIComponent(username)}`);
  }

  updateProfile(data: UserProfileUpdate, username: string = this.getUsername()): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseUrl}/profile?username=${encodeURIComponent(username)}`, data);
  }

  getStats(username: string = this.getUsername()): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.baseUrl}/stats?username=${encodeURIComponent(username)}`);
  }

  onStatsChanged(): Observable<void> {
    return this.statsChangedSubject.asObservable();
  }

  notifyStatsChanged(): void {
    this.statsChangedSubject.next();
  }

  private getUsername(): string {
    const username = localStorage.getItem('username') || localStorage.getItem('identifier') || 'satish';
    if (!localStorage.getItem('username') && username) {
      localStorage.setItem('username', username);
    }
    return username.trim();
  }
}

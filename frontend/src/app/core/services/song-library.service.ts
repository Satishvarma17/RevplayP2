import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LibrarySong {
  id: number;
  title: string;
  artist: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface SongResponse {
  id: number;
  title: string;
  artistName: string;
}

@Injectable({ providedIn: 'root' })
export class SongLibraryService {
  private baseUrl = `${environment.apiUrl}/songs`;

  constructor(private http: HttpClient) {}

  getPublicSongs(): Observable<LibrarySong[]> {
    return this.http
      .get<ApiResponse<SongResponse[]>>(`${this.baseUrl}/public`)
      .pipe(
        map((response) =>
          (response?.data ?? []).map((song) => ({
            id: song.id,
            title: song.title,
            artist: song.artistName,
          })),
        ),
      );
  }
}

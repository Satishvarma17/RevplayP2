import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  id: number;
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private baseUrl = 'http://localhost:8080/api/songs';

  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.baseUrl);
  }
}
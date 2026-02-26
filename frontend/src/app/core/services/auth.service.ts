import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  saveSession(token: string, username?: string | null): void {
    localStorage.setItem('token', token);

    const resolvedUsername = username?.trim() || this.getUsernameFromToken(token);
    if (resolvedUsername) {
      localStorage.setItem('username', resolvedUsername);
    }
  }

  saveToken(token: string): void {
    this.saveSession(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('identifier');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const payload = this.getJwtPayload();
    return payload?.role ?? null;
  }

  hasRole(expectedRole: string): boolean {
    return this.getUserRole() === expectedRole;
  }

  getCurrentUsername(): string {
    const fromStorage = localStorage.getItem('username')?.trim();
    if (fromStorage) {
      return fromStorage;
    }

    const token = this.getToken();
    const fromToken = token ? this.getUsernameFromToken(token) : '';
    if (fromToken) {
      localStorage.setItem('username', fromToken);
      return fromToken;
    }

    return 'satish';
  }

  setCurrentUsername(username: string): void {
    const normalized = username?.trim();
    if (!normalized) {
      localStorage.removeItem('username');
      return;
    }
    localStorage.setItem('username', normalized);
  }

  private getJwtPayload(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        return null;
      }

      const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
      return JSON.parse(atob(padded));
    } catch {
      return null;
    }
  }

  private getUsernameFromToken(token: string): string {
    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        return '';
      }

      const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
      const payload = JSON.parse(atob(padded));
      return (payload?.sub ?? '').toString().trim();
    } catch {
      return '';
    }
  }
}

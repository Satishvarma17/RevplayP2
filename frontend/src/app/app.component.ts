import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSessionService } from './core/service/auth-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  userIdInput = '';
  currentUserId: number | null = null;
  sessionMessage = '';

  constructor(
    private authSessionService: AuthSessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshSessionState();
  }

  onUserIdInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.userIdInput = input?.value ?? '';
  }

  loginWithUserId(): void {
    const parsed = Number(this.userIdInput);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      this.sessionMessage = 'Enter a valid user ID (positive integer).';
      return;
    }

    this.authSessionService.setCurrentUserId(parsed);
    this.userIdInput = '';
    this.sessionMessage = 'User session updated.';
    this.refreshSessionState();
  }

  logout(): void {
    this.authSessionService.clearCurrentUserId();
    this.sessionMessage = 'Session cleared.';
    this.refreshSessionState();
    this.router.navigate(['/player']);
  }

  private refreshSessionState(): void {
    this.currentUserId = this.authSessionService.getCurrentUserId();
  }
}

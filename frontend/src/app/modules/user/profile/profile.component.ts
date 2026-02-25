import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfile, UserService, UserStats } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: UserProfile = {
    username: '',
    email: '',
    displayName: '',
    bio: '',
    profileImage: ''
  };
  stats: UserStats = {
    totalPlaylists: 0,
    totalFavorites: 0,
    totalListeningMinutes: 0
  };
  private statsChangedSub?: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadStats();
    this.statsChangedSub = this.userService.onStatsChanged().subscribe(() => {
      this.loadStats();
    });
  }

  ngOnDestroy(): void {
    this.statsChangedSub?.unsubscribe();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
      }
    });
  }

  loadStats(): void {
    this.userService.getStats().subscribe({
      next: (res) => {
        this.stats = res;
      }
    });
  }

  updateProfile(): void {
    this.userService.updateProfile({
      displayName: this.user.displayName,
      bio: this.user.bio,
      profileImage: this.user.profileImage
    }).subscribe({
      next: (res) => {
        this.user = res;
        this.loadStats();
        alert('Profile updated successfully');
      },
      error: () => {
        alert('Failed to update profile');
      }
    });
  }
}

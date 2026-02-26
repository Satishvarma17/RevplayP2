import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
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
  editableUser: UserProfile = {
    username: '',
    email: '',
    displayName: '',
    bio: '',
    profileImage: ''
  };
  isEditMode = false;
  isSaving = false;
  stats: UserStats = {
    totalPlaylists: 0,
    totalFavorites: 0,
    totalListeningMinutes: 0
  };
  private statsChangedSub?: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

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
        this.editableUser = { ...res };
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

  toggleProfileEdit(): void {
    if (!this.isEditMode) {
      this.editableUser = { ...this.user };
      this.isEditMode = true;
      return;
    }

    this.saveProfile();
  }

  private saveProfile(): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.userService.updateProfile({
      username: this.editableUser.username,
      email: this.editableUser.email,
      displayName: this.editableUser.displayName,
      bio: this.editableUser.bio,
      profileImage: this.editableUser.profileImage
    }).subscribe({
      next: (res) => {
        const previousUsername = this.user.username;
        this.user = res;
        this.editableUser = { ...res };
        if (res.username && res.username !== previousUsername) {
          this.authService.setCurrentUsername(res.username);
        }
        this.isEditMode = false;
        this.isSaving = false;
        this.loadStats();
        alert('Profile updated successfully');
      },
      error: () => {
        this.isSaving = false;
        alert('Failed to update profile');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home/login']);
  }
}

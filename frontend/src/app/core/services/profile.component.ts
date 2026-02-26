import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  stats: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadStats();
  }

  loadProfile() {
    this.userService.getProfile().subscribe(res => {
      this.user = res;
    });
  }

  loadStats() {
    this.userService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.user)
      .subscribe(() => {
        alert('Profile Updated Successfully');
      });
  }
}
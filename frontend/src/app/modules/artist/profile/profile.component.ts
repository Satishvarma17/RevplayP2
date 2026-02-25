import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArtistService } from 'src/app/services/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  profileData: any = null;
  artistId!: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.artistId = Number(localStorage.getItem("artistId"));

    if (!this.artistId) {
      this.router.navigate(['/artist/register']);
      return;
    }

    this.profileForm = this.fb.group({
      artistName: [''],
      bio: [''],
      genre: [''],
      instagramLink: [''],
      twitterLink: [''],
      youtubeLink: [''],
      websiteLink: ['']
    });

    this.loadProfile();
  }

  loadProfile() {
    this.artistService.getArtistProfile(this.artistId)
      .subscribe((res: any) => {

        this.profileData = res?.data;

        if (this.profileData) {
          this.profileForm.patchValue(this.profileData);
        }
      });
  }

  enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.profileForm.patchValue(this.profileData);
  }

  updateProfile() {
    this.artistService.updateArtistProfile(
      this.artistId,
      this.profileForm.value
    ).subscribe(() => {
      alert("Profile updated successfully");
      this.isEditMode = false;
      this.loadProfile();
    });
  }
}
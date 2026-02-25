import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { identifier, password } = this.loginForm.value;
    const payload = {
      username: identifier,
      password,
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        const token = response?.data?.token;
        if (token) {
          this.authService.saveToken(token);
          this.successMessage = 'Login successful';

          const tokenRole = this.authService.getUserRole();
          if (tokenRole === 'ARTIST') {
            this.router.navigate(['/artist/dashboard']);
          } else {
            this.router.navigate(['/user/dashboard']);
          }
        } else {
          this.errorMessage = 'Token not found in response';
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      },
    });
  }
}

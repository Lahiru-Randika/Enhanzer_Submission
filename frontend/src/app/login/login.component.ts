import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(){
    this.api.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/purchase']),
      error: () => alert('Login failed')
    });
  }
}
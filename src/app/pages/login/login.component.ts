import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  http = inject(HttpClient);
  router = inject(Router);

  toggleForm: string = "login";

  errorMsg: string = "";

  registerObj: any = {
    userId: 0,
    email: '',
    password: '',
    fullName: '',
    mobile: '',
    createdAt: new Date(),
  };

  confirmPassword: string = '';

  isError: boolean = false;

  loginObj: any = {
    email: '',
    password: '',
  };

  onRegister = () => {

    if (
      !this.registerObj.fullName || 
      !this.registerObj.email || 
      !this.registerObj.mobile || 
      !this.registerObj.password || 
      !this.confirmPassword
    ) {
      this.errorMsg = "All fields are required!";
      this.isError = true;
      return;
    } else {
      this.isError = false; // Clear error message if all fields are filled
    }
  
    // Password length validation
    if (this.registerObj.password.length < 8) {
      this.errorMsg = "Password must be at least 8 characters long";
      this.isError = true;
      return;
    }
  
    // Password match validation
    if (this.registerObj.password !== this.confirmPassword) {
      this.errorMsg = "Passwords do not match";
      this.isError = true;
      return;
    }

    this.isError = false;

    this.http.post('https://localhost:7011/api/User/CreateUser', this.registerObj)
    .subscribe((res: any) => {
      alert("User registered successfully.");
      // Reset form
      this.registerObj = {
        userId: 0,
        email: '',
        password: '',
        fullName: '',
        mobile: '',
        createdAt: new Date(),
      };
      this.toggleForm = "login";
    }, (err: any) => {
      if (err.status === 400) {
        alert("Invalid body.");
      }
      else if (err.status === 500) {
        alert("Email already exists.");
      }
      else {
        alert("An error occurred.");
      }
    });

  }

  onLogin = () => {
    
    if (
      !this.loginObj.email ||
      !this.loginObj.password
    ) {
      this.errorMsg = "Email and password are required!";
      this.isError = true;
      return;
    }

    this.isError = false;

    this.http.post('https://localhost:7011/api/User/Login', this.loginObj)
   .subscribe((res: any) => {
      alert("Login successful");
      // Reset form
      this.loginObj = {
        email: '',
        password: '',
      };
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/user-list']);
   }, (err: any) =>{
     if (err.status === 401) {
       alert("Invalid credentials.");
       this.errorMsg = "Invalid credentials";
       this.isError = true;
     } else {
       alert("An error occurred.");
     }
   });

  }

  checkLogin = () => {
    if (!!localStorage.getItem('user')) {
      this.router.navigate(['/user-list']); 
      return true;
    }
    else {
      return false;
    }
  }

}

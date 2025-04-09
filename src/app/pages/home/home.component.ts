import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  router = inject(Router);

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  userName: string = this.user?.fullName || '';


  onLogout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  checkLogin = () => {
     if (!!localStorage.getItem('user')) {
       return true;
     }
     else {
      this.router.navigate(['/login']);
      return false;
     }
  };

}

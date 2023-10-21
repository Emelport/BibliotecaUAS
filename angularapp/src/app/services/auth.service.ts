// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() {
    // Recuperar el estado de inicio de sesión desde LocalStorage al inicializar el servicio.
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    console.log('login');
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    console.log('logout');
  }

  isLoggedInUser() {
    return this.isLoggedIn;
  }
}

// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   isLoggedIn = false;
   username: string = ''; 
   id: number = 0;

  constructor() {
    // Recuperar el estado de inicio de sesión desde LocalStorage al inicializar el servicio.
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    //Sino esta vacio
    if(localStorage.getItem('username') != null){
      this.username = localStorage.getItem('username') || '';
    }
    if(localStorage.getItem('id') != null){
      this.id = parseInt(localStorage.getItem('id') || '0');
    }

  }

  login(usuario: string) {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', usuario);
    console.log('login');
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    console.log('logout');
  }

  isLoggedInUser() {
    return this.isLoggedIn;
  }
}

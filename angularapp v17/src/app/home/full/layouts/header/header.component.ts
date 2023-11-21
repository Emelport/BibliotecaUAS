import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../material.module';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  username: string = 'Usuario';

  ngOnInit(): void {
      //Traer el username del usuario logueado del localstorage
      this.username = localStorage.getItem('username') || 'Usuario';
  }
  
  openSettings() {
    // Agrega lógica para abrir la configuración.
    console.log('Abrir configuración');
  }

  logout() {
    // Agrega lógica para cerrar sesión.
    const auth = new AuthService();
    auth.logout();
    console.log('Cerrar sesión');
    //llevar al usuario a la pagina de login
    window.location.href = '/login';
  }
}

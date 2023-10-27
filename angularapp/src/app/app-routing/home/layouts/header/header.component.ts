import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Puedes agregar lógica personalizada aquí, por ejemplo, para manejar la apertura del menú y cerrar sesión.
  // Debes importar las clases y servicios necesarios.

  openSettings() {
    // Agrega lógica para abrir la configuración.
    console.log('Abrir configuración');
  }

  logout() {
    // Agrega lógica para cerrar sesión.
    console.log('Cerrar sesión');
    //recargar la pagina
    window.location.reload();
  }
}
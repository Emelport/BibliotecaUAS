import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { IAbcUsuario } from '../../interfaces/interfaces'; // Asegúrate de importar la interfaz
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit() {
    const credentials = { username: this.username, password: this.password };
    const service = new AuthService();

    this.loginService.login(credentials).subscribe((user: IAbcUsuario) => {
      // Si la autenticación es exitosa, redirige al usuario a la página "/home"
      this.router.navigate(['/home']);
      //usa el servicio de autenticación para establecer el estado de inicio de sesión del usuario en true
      service.login();
    }, error => {
      // Manejo de errores en caso de autenticación fallida
      console.error('Error en el inicio de sesión:', error);
    });

   
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUsuario } from '../../interfaces/interfaces'; // Asegúrate de importar la interfaz
import { MaterialModule } from '../../material.module';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule,Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MaterialModule,FooterComponent,NavBarComponent,RouterModule,HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService]
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  newPassword: string = '';
  email: string = '';
  fullName: string = '';
  newUsuario: string = '';

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService = loginService;
    this.router = router;
    this.username = '';

  }

  onSubmit() {
    const credentials = { usuario: this.username.toLowerCase(), password: this.password };
    const service = new AuthService();

  
    this.loginService.login(credentials).subscribe((user: IUsuario) => {
      // Si la autenticación es exitosa, redirige al usuario a la página "/home"
      this.router.navigate(['/home']);
      //usa el servicio de autenticación para establecer el estado de inicio de sesión del usuario en true
      service.login(user.nombreCompleto);
    }, error => {
      // Manejo de errores en caso de autenticación fallida
      console.error('Error en el inicio de sesión:', error);
    });
  }

  onRegister() {
    const credentials = { nombreCompleto: this.fullName.toLowerCase(),usuario: this.newUsuario.toLowerCase(),password: this.newPassword};
    const service = new AuthService();

    this.loginService.register(credentials).subscribe((user: IUsuario) => {
      // Si la autenticación es exitosa, redirige al usuario a la página "/home"
      this.router.navigate(['/home']);
      service.login(user.nombreCompleto);
    
    });
  }
}

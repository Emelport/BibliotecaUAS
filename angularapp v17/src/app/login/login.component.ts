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
import { DialogService } from '../../services/dialog.service';

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
  nombre: string = '';
  apellidos: string = '';
  newUsuario: string = '';

  constructor(private loginService: LoginService, private router: Router, private dialogService: DialogService) {
    this.loginService = loginService;
    this.router = router;
    this.username = '';

  }

  onSubmit() {
    const credentials = { usuario: this.username.toLowerCase(), password: this.password };
    const service = new AuthService();


    this.loginService.login(credentials).subscribe((user: IUsuario) => {
      // Si la autenticación es exitosa, redirige al usuario a la página "/home"
      service.login(user.nombre);
      console.log('Inicio de sesión exitoso',user)
      this.router.navigate(['/home']);
    }, error => {
      // Manejo de errores en caso de autenticación fallida
      console.error('Error en el inicio de sesión:', error);
      //VAlidar que no este vacio el error y mandar otra cosa cuando lo este

      this.dialogService.openMessageBox('error', 'Error', error.statusText).then(() => {
        // En caso de que el usuario haga clic en el botón "Aceptar", se limpian los campos de usuario y contraseña
        this.password = '';
      });
    });
  }

  onRegister() {


    const credentials = { nombre: this.nombre.toUpperCase(),apellidos: this.apellidos.toUpperCase(),usuario: this.newUsuario.toLowerCase(),password: this.newPassword};
    const service = new AuthService();

   //consumir el api, mostrar mensaje de exito o error
    this.loginService.register(credentials).subscribe((user: IUsuario) => {
      // Si la autenticación es exitosa, redirige al usuario a la página "/home"
      service.login(user.nombre);
      console.log('Registro exitoso', user)
      this.dialogService.openMessageBox('success', 'Registro exitoso', 'Usuario registrado correctamente');
      this.router.navigate(['/home']);


    });

  }
}

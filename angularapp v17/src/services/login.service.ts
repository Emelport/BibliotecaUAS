import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/interfaces'; // Asegúrate de importar la interfaz

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private loginUrl = 'http://127.0.0.1:8000/gestion/usuarios/validar_usuario/'; // Asegúrate de que esta sea la ruta correcta de tu API
  private registerUrl = 'http://127.0.0.1:8000/gestion/usuarios/';

  constructor(private http: HttpClient) { 
    this.http = http;
  }

  login(credentials: { usuario: string, password: string }): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.loginUrl, credentials);
  }

  register(credentials: { nombre: string, apellidos: string, usuario: string, password: string }): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.registerUrl, credentials);
  }
}

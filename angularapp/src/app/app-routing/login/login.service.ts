import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAbcUsuario } from '../../interfaces/interfaces'; // Asegúrate de importar la interfaz

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7024/api/Usuarios/Login'; // Asegúrate de que esta sea la ruta correcta de tu API

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<IAbcUsuario> {
    return this.http.post<IAbcUsuario>(this.apiUrl, credentials);
  }
}

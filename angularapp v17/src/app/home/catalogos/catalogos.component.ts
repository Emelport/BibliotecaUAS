import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { DialogService } from '../../../services/dialog.service';


@Component({
  selector: 'app-catalogos',
  standalone: true,
  imports: [CommonModule,MaterialModule,HttpClientModule],
  templateUrl: './catalogos.component.html',
  styleUrl: './catalogos.component.scss'
})
export class CatalogosComponent implements OnInit{
    carreras: any[] = [];
    facultades: any[] = [];
    tipoUsuarios: any[] = [];

    selectedTipoUsuario: any;
    selectedFacultad: any;
    selectedCarrera: any;

    //CARRERA
    idCarrera: String="";
    nombreCarrera: String="";
    idFacultadCarrera: Number=1;

    //FACULTAD
    idFacultad: String="";
    nombreFacultad: String="";

    //TIPO DE USUARIO
    idTipoUsuario: String="";
    nombreTipoUsuario: String="";

    selectedTab: string = 'carreras';
    carrerasFiltradas: any[] = [];
    facultadesFiltradas: any[] = [];
    tiposUsuariosFiltrados: any[] = [];

    constructor(private http: HttpClient, private dialogService: DialogService) { }



    ngOnInit(): void {

      this.cargarFacultades();
      this.cargarCarreras();
      this.cargarTipoUsuarios();

    }

    cargarCarreras(){
      //Cargar las carreras
      this.http.get('http://127.0.0.1:8000/gestion/carreras/').subscribe((res: any) => {
        //Aquí se cargan las carreras
        this.carreras = res;
        console.log("CARRERAS",this.carreras);
      });

    }

    cargarFacultades(){
      //Cargar las facultades
      this.http.get('http://127.0.0.1:8000/gestion/facultades/').subscribe((res: any) => {
        this.facultades = res;
        console.log("FACULTADES",this.facultades);
      });
    }

    cargarTipoUsuarios(){
      //Cargar los tipos de usuarios
      this.http.get('http://127.0.0.1:8000/gestion/tiposusuarios/').subscribe((res: any) => {
        this.tipoUsuarios = res;
        console.log("TIPOS DE USUARIOS",this.tipoUsuarios);
      });
    }

    filterCarreras(event: any): void {
        const searchTerm = event.target.value.toLowerCase();
        this.carrerasFiltradas = this.carreras.filter(carrera => carrera.nombre.toLowerCase().includes(searchTerm));
    }

    filterFacultades(event: any): void {
        const searchTerm = event.target.value.toLowerCase();
        this.facultadesFiltradas = this.facultades.filter(facultad => facultad.nombre.toLowerCase().includes(searchTerm));
    }

    filterTiposUsuarios(event: any): void {
        const searchTerm = event.target.value.toLowerCase();
        this.tiposUsuariosFiltrados = this.tipoUsuarios.filter(tipoUsuario => tipoUsuario.nombre.toLowerCase().includes(searchTerm));
    }

    agregarFacultad(){
      //campos vacios
      if (this.nombreFacultad == "") {
        this.dialogService.openMessageBox('info', 'Confirmar', 'Debes llenar todos los campos para poder crear una facultad.').then((result) => {
        });
        return;
      }

      //Si hay alguna facultad seleccionada, se actualiza http://127.0.0.1:8000/gestion/facultades/id
      if(this.selectedFacultad) {
        //Crear el objeto a enviar
        let facultad = {
          id: this.selectedFacultad.id,
          nombre: this.nombreFacultad
        }

        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas actualizar la facultad? Revisa La informacion antes de actualizar.').then((result) => {
          this.http.put('http://127.0.0.1:8000/gestion/facultades/' + this.selectedFacultad.id + '/', facultad).subscribe((res: any) => {
            console.log("FACULTAD ACTUALIZADA", res);
            this.cargarFacultades();
            this.deseleccionarFacultad();

          });
        });
      }else {
        //Si no hay ninguna facultad seleccionada, se crea http://http://127.0.0.1:8000/gestion/facultades/
        let facultad = {
          nombre: this.nombreFacultad
        }

        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas crear la facultad?').then((result) => {
          this.http.post('http://127.0.0.1:8000/gestion/facultades/', facultad).subscribe((res: any) => {
            console.log("FACULTAD CREADA", res);
            this.cargarFacultades();
            this.deseleccionarFacultad();
          });
        });
      }


    }

    agregarTipoUsuario() {

      //campos vacios
      if (this.nombreTipoUsuario == "") {
        this.dialogService.openMessageBox('info', 'Confirmar', 'Debes llenar todos los campos para poder crear un tipo de usuario.').then((result) => {
        });
        return;
      }

      //Si hay algun tipo de usuario seleccionado, se actualiza http://127.0.0.1:8000/gestion/tiposusuarios/id"
      if (this.selectedTipoUsuario) {
        //Crear el objeto a enviar
        let tipoUsuario = {
          id: this.selectedTipoUsuario.id,
          nombre: this.nombreTipoUsuario
        }

        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas actualizar el tipo de usuario? Revisa La informacion antes de actualizar.').then((result) => {
          this.http.put('http://127.0.0.1:8000/gestion/tiposusuarios/' + this.selectedTipoUsuario.id + '/', tipoUsuario).subscribe((res: any) => {
              console.log("TIPO DE USUARIO ACTUALIZADO", res);
              this.cargarTipoUsuarios();
              this.deseleccionarTipoUsuario();

            }
          );
        });

      }else {
        let tipoUsuario = {
          nombre: this.nombreTipoUsuario
        }
        //Si no hay ningun tipo de usuario seleccionado, se crea http://127.0.0.1:8000/gestion/tiposusuarios/ sin mandar el id
        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas crear el tipo de usuario?').then((result) => {
          this.http.post('http://127.0.0.1:8000/gestion/tiposusuarios/', tipoUsuario).subscribe((res: any) => {
              console.log("TIPO DE USUARIO CREADO", res);
              this.cargarTipoUsuarios();
              this.deseleccionarTipoUsuario();
            }
          );
        });
      }

    }

    agregarCarrera() {

      //campos vacios
      if (this.nombreCarrera == "") {
        this.dialogService.openMessageBox('info', 'Confirmar', 'Debes llenar todos los campos para poder crear una carrera.').then((result) => {
        });
        return;
      }

      //Crear el objeto a enviar
      let carrera = {
        id: this.selectedCarrera.id,
        nombre: this.nombreCarrera,
        facultad: this.selectedCarrera.facultad
      }


      //Si hay alguna carrera seleccionada, se actualiza http://127.0.0.1:8000/gestion/carreras/id"
      if(this.selectedCarrera) {

        //Crear el objeto a enviar
        let carrera = {
          id: this.selectedCarrera.id,
          nombre: this.nombreCarrera,
          facultad: this.selectedCarrera.facultad
        }


        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas actualizar la carrera? Revisa La informacion antes.').then((result) => {
          this.http.put('http://127.0.0.1:8000/gestion/carreras/' + this.selectedCarrera.id + '/', carrera).subscribe((res: any) => {
            console.log("CARRERA ACTUALIZADA", res);
            this.cargarCarreras();
            this.deseleccionarCarrera();

          });
        });
      }else {
        //Si no hay ninguna carrera seleccionada, se crea http://
        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas crear la carrera?').then((result) => {
          this.http.post('http://127.0.0.1:8000/gestion/carreras/', carrera).subscribe((res: any) => {
            console.log("CARRERA CREADA", res);
            this.cargarCarreras();
            this.deseleccionarCarrera();
          });
        });
      }

    }

    seleccionarVista(vista: string): void {
        this.selectedTab = vista;
        console.log("VISTA SELECCIONADA",vista);
    }

    seleccionarCarrera(carrera: any){
        console.log("CARRERA SELECCIONADA",carrera);
        this.selectedCarrera = carrera;
        this.idCarrera = carrera.id;
        this.nombreCarrera = carrera.nombre;
        this.idFacultadCarrera = carrera.facultad;
        this.carrerasFiltradas = [];
    }

  facultadCarrera(any: any){
      this.idFacultadCarrera = any.id;
      console.log("ID FACULTAD CARRERA",this.idFacultadCarrera)
  }
    deseleccionarCarrera(){
        this.selectedCarrera = null;
        this.idCarrera = "";
        this.nombreCarrera = "";
        this.carrerasFiltradas = [];
    }

  seleccionarFacultad(facultad: any){
    console.log("FACULTAD SELECCIONADA",facultad);
    this.carrerasFiltradas = [];
    this.nombreFacultad = facultad.nombre;
    this.idFacultad = facultad.id;
    this.selectedFacultad = facultad;
    this.facultadesFiltradas = [];
  }

  seleccionarTipoUsuario(tipoUsuario: any){
    console.log("TIPO DE USUARIO SELECCIONADO",tipoUsuario);
    this.carrerasFiltradas = [];
    this.nombreTipoUsuario = tipoUsuario.nombre;
    this.idTipoUsuario = tipoUsuario.id;
    this.selectedTipoUsuario = tipoUsuario;
    this.tiposUsuariosFiltrados = [];

  }

  deseleccionarFacultad(){
    this.selectedFacultad = null;
    this.idFacultad = "";
    this.nombreFacultad = "";
    this.facultadesFiltradas = [];
  }

  deseleccionarTipoUsuario(){
    this.selectedTipoUsuario = null;
    this.idTipoUsuario = "";
    this.nombreTipoUsuario = "";
  }
}

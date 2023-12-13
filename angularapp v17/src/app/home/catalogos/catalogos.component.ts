import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { DialogService } from '../../../services/dialog.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-catalogos',
  standalone: true,
  imports: [CommonModule,MaterialModule,HttpClientModule,ReactiveFormsModule],
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

    //Formularios para cada catalogo
    catalogoCarreras: FormGroup;
    catalogoFacultades: FormGroup;
    catalogoTiposUsuarios: FormGroup;   

    selectedTab: string = 'carreras';
    carrerasFiltradas: any[] = [];
    facultadesFiltradas: any[] = [];
    tiposUsuariosFiltrados: any[] = [];

    constructor(private http: HttpClient, private dialogService: DialogService, private formBuilder: FormBuilder) {

      this.catalogoCarreras = this.formBuilder.group({
        id: '',
        nombre: '',
        facultad: ''
      });
      
      this.catalogoFacultades = this.formBuilder.group({
        id: '',
        nombre: ''
      });

      this.catalogoTiposUsuarios = this.formBuilder.group({
        id: '',
        nombre: ''
      });

     }



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
      const facultad = this.catalogoFacultades.value;
      console.log("FACULTAD",facultad);

      //Si hay alguna facultad seleccionada, se actualiza http://
      if(this.selectedFacultad) {

        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas actualizar la facultad? Revisa La informacion antes de actualizar.').then((result) => {
          this.http.put('http://127.0.0.1:8000/gestion/facultades/' + this.selectedFacultad.id + '/', facultad).subscribe((res: any) => {
            console.log("FACULTAD ACTUALIZADA", res);
            this.cargarFacultades();
            this.deseleccionarFacultad();

          });
        });
      }else {
        //Si no hay ninguna facultad seleccionada, se crea http://
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
      const data = this.catalogoTiposUsuarios.value;

      //Si hay algun tipo de usuario seleccionado, se actualiza http://127.0.0.1:8000/gestion/tiposusuarios/id"
      if (this.selectedTipoUsuario) {

        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas actualizar el tipo de usuario? Revisa La informacion antes de actualizar.').then((result) => {
          this.http.put('http://127.0.0.1:8000/gestion/tiposusuarios/' + this.selectedTipoUsuario.id + '/', data).subscribe((res: any) => {
              console.log("TIPO DE USUARIO ACTUALIZADO", res);
              this.cargarTipoUsuarios();
              this.deseleccionarTipoUsuario();

            }
          );
        });

      }else {

        //Si no hay ningun tipo de usuario seleccionado, se crea http://127.0.0.1:8000/gestion/tiposusuarios/ sin mandar el id
        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas crear el tipo de usuario?').then((result) => {
          this.http.post('http://127.0.0.1:8000/gestion/tiposusuarios/', data).subscribe((res: any) => {
              console.log("TIPO DE USUARIO CREADO", res);
              this.cargarTipoUsuarios();
              this.deseleccionarTipoUsuario();
            }
          );
        });
      }

    }

    agregarCarrera() {
      const data = this.catalogoCarreras.value;

      //Si hay alguna carrera seleccionada, se actualiza http://127.0.0.1:8000/gestion/carreras/id"
      if(this.selectedCarrera) {

        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas actualizar la carrera? Revisa La informacion antes.').then((result) => {
          this.http.put('http://127.0.0.1:8000/gestion/carreras/' + this.selectedCarrera.id + '/', data).subscribe((res: any) => {
            console.log("CARRERA ACTUALIZADA", res);
            this.cargarCarreras();
            this.deseleccionarCarrera();

          });
        });
      }else {
        //Si no hay ninguna carrera seleccionada, se crea http://
        this.dialogService.openMessageBox('warning', 'Confirmar', '¿Estás seguro de que deseas crear la carrera?').then((result) => {
          this.http.post('http://127.0.0.1:8000/gestion/carreras/', data).subscribe((res: any) => {
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
        this.carrerasFiltradas = [];

        //Cargarla en el catalogoCarrera
        this.catalogoCarreras.patchValue({
          id: carrera.id,
          nombre: carrera.nombre,
          facultad: carrera.facultad
        });
    }

  deseleccionarCarrera(){
      this.selectedCarrera = null;
      this.carrerasFiltradas = [];
      //limpiar el formulario 
      this.catalogoCarreras.reset();
  }

  seleccionarFacultad(facultad: any){
    console.log("FACULTAD SELECCIONADA",facultad);
    this.carrerasFiltradas = [];
    this.selectedFacultad = facultad;
    this.facultadesFiltradas = [];

    //Cargarla en el catalogoFacultad
    this.catalogoFacultades.patchValue({
      id: facultad.id,
      nombre: facultad.nombre
    });
  }

  seleccionarTipoUsuario(tipoUsuario: any){
    console.log("TIPO DE USUARIO SELECCIONADO",tipoUsuario);
    this.carrerasFiltradas = [];
    this.tiposUsuariosFiltrados = [];

    this.selectedTipoUsuario = tipoUsuario;

    //Cargarla en el catalogoTipoUsuario
    this.catalogoTiposUsuarios.patchValue({
      id: tipoUsuario.id,
      nombre: tipoUsuario.nombre
    });

  }

  deseleccionarFacultad(){
    this.selectedFacultad = null;3
    this.facultadesFiltradas = [];

    //limpiar el formulario
    this.catalogoFacultades.reset();
  }

  deseleccionarTipoUsuario(){
    this.selectedTipoUsuario = null;
    this.tiposUsuariosFiltrados = [];

    //limpiar el formulario
    this.catalogoTiposUsuarios.reset();
  }

}


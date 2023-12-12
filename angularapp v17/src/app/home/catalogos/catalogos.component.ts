import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';


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
    selectedFacultad: any;
    selectedCarrera: any;
    idCarrera: String="";
    nombreCarrera: String="";
    idFacultad: String="";
    nombreFacultad: String="";
    selectedTab: string = 'carreras';
    carrerasFiltradas: any[] = [];
    facultaesFiltradas: any[] = [];

    constructor(private http: HttpClient) { }



    ngOnInit(): void {

        //Cargar las carreras
        this.http.get('http://127.0.0.1:8000/gestion/carreras/').subscribe((res: any) => {
            //Aquí se cargan las carreras
            this.carreras = res;
            console.log("CARRERAS",this.carreras);
        });


        //Cargar las facultades
        this.http.get('http://127.0.0.1:8000/gestion/facultades/').subscribe((res: any) => {
            this.facultades = res;
            console.log("FACULTADES",this.facultades);
        });
    
    }


    filterCarreras(event: any): void {
        const searchTerm = event.target.value.toLowerCase();
        this.carrerasFiltradas = this.carreras.filter(carrera => carrera.nombre.toLowerCase().includes(searchTerm));
    }

    agregarFacultad(){
    }

    agregarCarrera(){
    }

    eliminarFacultad(){
    }

    eliminarCarrera(){
    }

    agregarElemento(){
    }

    seleccionarVista(vista: string): void {
        this.selectedTab = vista;
    }

    seleccionarCarrera(carrera: any){
        console.log("CARRERA SELECCIONADA",carrera);
        this.selectedCarrera = carrera;
        this.idCarrera = carrera.id;
        this.nombreCarrera = carrera.nombre;
    }
}

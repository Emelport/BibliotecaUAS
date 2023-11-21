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
    selectedTab: string = 'carreras';

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

    seleccionarCarrera(nombre: string){
        

    }
}

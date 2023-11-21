import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormsModule,FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//File saver y convertidor excel
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-rdu',
  standalone: true,
  imports: [CommonModule,MaterialModule,FormsModule,ReactiveFormsModule,MatNativeDateModule,HttpClientModule],
  templateUrl: './rdu.component.html',
  styleUrl: './rdu.component.scss'
})

export class RduComponent implements OnInit {

  capturasForm: FormGroup;
  consultaForm: FormGroup;
  view: string = 'capturar';
  data: any[] = [
    // Aquí puedes poner tus datos de ejemplo
  ];
  currentTime = new Date();
  currentDate = new Date();
  filteredData: any[] = [...this.data];
  //Arreglo con las carreras y otro para facultades vacios
  carreras: any[] = [];
  facultades: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    

    ) {
    this.capturasForm = this.formBuilder.group({
      id: '',
      nombre: '',
      sexo: '',
      tipoUsuario: '',	
      fechayhora: new Date(),
      id_facultad: '',
      id_carrera: '',
    });
    this.consultaForm = this.formBuilder.group({
      fechaInicio: new Date(),
      fechaFin: new Date(),
      sexo: '',
      id_facultad: '',
      id_carrera: '',
      tipoUsuario: '',
    });
  }

  toggleView(view: string) {
    this.view = view;
    console.log(view)
  }

  submitForm() {
    const data = this.capturasForm.value;
    console.log(data);

    this.http.post('http://127.0.0.1:8000/gestion/rdus/', data).subscribe((res: any) => {	
      console.log(res);
    });
    
  }
  applyFilters() {
    const filters = this.consultaForm.value;
    //console.log(filters);
  
    // Traer todos los datos sin aplicar filtros
    this.http.get('http://127.0.0.1:8000/gestion/rdus/').subscribe((res: any) => {
      this.filteredData = res;

      this.filteredData.forEach((item: any) => {
        item.id_carrera = this.carreras.find((carrera: any) => carrera.id === item.id_carrera).nombre;
        item.id_facultad = this.facultades.find((facultad: any) => facultad.id === item.id_facultad).nombre;
      });
      //aplicar un pipe para filtrar por fecha, sexo, facultad, carrera y tipo de usuario

      console.log(this.filteredData);

  
      });
  }
  
  
  exportarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivo(excelBuffer, 'datos');
  }

  private guardarArchivo(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
      
  

  ngOnInit(): void {
    this.updateTime();

    //Cargar las carreras
    this.http.get('http://127.0.0.1:8000/gestion/carreras/').subscribe((res: any) => {
      this.carreras = res;
    });

    //Cargar las facultades
    this.http.get('http://127.0.0.1:8000/gestion/facultades/').subscribe((res: any) => {
      this.facultades = res;
    });

    //Cargar los datos
  }

  private updateTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000); // Actualiza cada segundo
  }
}

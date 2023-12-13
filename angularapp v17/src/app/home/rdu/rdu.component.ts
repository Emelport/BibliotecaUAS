import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormsModule,FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogService } from '../../../services/dialog.service';
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
  visitaForm: FormGroup;
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
  tipoUsuarios: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialogService: DialogService


    ) {
    this.capturasForm = this.formBuilder.group({
      id: '',
      nombre: '',
      apellidos: '',
      matricula: '',
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

    this.visitaForm = this.formBuilder.group({
      id: '',
      fechayhora: new Date(),
      matricula: '',
      idRDU: ''
    });
  }

  toggleView(view: string) {
    this.view = view;
    console.log(view)
  }

  submitForm() {
    const data = this.capturasForm.value;
    const dataVisita = this.visitaForm.value;
    //Si no existe matricula ponla null
    if (data.matricula === '') {
      data.matricula = null;
    }
    console.log(data);

    // si ya existe la matricula, no se registra pero avisar al usuario http://127.0.0.1:8000/gestion/rdus/'

    this.http.post('http://127.0.0.1:8000/gestion/rdus/', data).subscribe((res: any) => {
      console.log(res);
      dataVisita.idRDU = res.id;
      dataVisita.fechayhora = new Date();

      
      this.http.post('http://127.0.0.1:8000/gestion/visitias/', dataVisita).subscribe((res: any) => {
        console.log(res);
      }, (error: any) => {
        console.log(error);
      });

      this.visitaForm.reset();

      this.dialogService.openMessageBox('info', 'Registro exitoso', 'Tu registro y visita fue exitoso, favor de insertar la matricula las proximas visitas.');
    }, (error: any) => {
      console.log(error);
      this.dialogService.openMessageBox('error', 'Error', 'No se ha podido registrar la captura.');
      return;
    });

    //Limpiar el formulario
    this.capturasForm.reset();


    



  }

  submitVisita() {

    const data = this.visitaForm.value;

    if (data.matricula === '') {
      this.dialogService.openMessageBox('error', 'Error', 'Inserte una matricula.');
      return;
    }
    console.log(data);

    this.http.get('http://127.0.0.1:8000/gestion/visitias/obtener_info_por_matricula/?matricula=' + data.matricula).subscribe((res: any) => {
      //cargar los datos de la visita en el formulario capturasForm
      console.log(res);
      this.capturasForm.patchValue({
        id: res.id,
        nombre: res.nombre,
        apellidos: res.apellidos,
        matricula: res.matricula,
        sexo: res.sexo,
        tipoUsuario: res.tipoUsuario,
        fechayhora: res.fechayhora,
        id_facultad: res.id_facultad,
        id_carrera: res.id_carrera,
      });
      
      //asignar res.id a idRDU
      this.visitaForm.patchValue({
        idRDU: res.id,
        fechayhora: new Date(),
      });

    });  



    // Preguntar si la información es correcta si el resultado es "accept" proceder
    this.dialogService.openMessageBox('warning', 'Información', '¿Eres tu?').then((result) => {
    
      if (result !== 'accept') {
        this.dialogService.openMessageBox('info', 'Información', 'Se ha abortado el registro de la visita.');
        this.capturasForm.reset();
        return;
      }
      // Si la información es correcta, se registra la visita, id, fecha y hora de la visita y idRDU
      const data = this.visitaForm.value;

      this.http.post('http://127.0.0.1:8000/gestion/visitias/', data).subscribe((res: any) => {
        console.log(res);
        this.capturasForm.reset();
        this.dialogService.openMessageBox('info', 'Registro exitoso', 'La visita se ha registrado correctamente.');
      }, (error: any) => {
        console.log(error);
        this.dialogService.openMessageBox('error', 'Error', 'No se ha podido registrar la visita.');
      });
      });

    //Limpiar el formulario
    this.visitaForm.reset();


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

  CONCENTRADO_RDU() {
    //abrir nueva pestaña con el reporte
    window.open('http://127.0.0.1:8000/gestion/visitias/generarReporteFront', '_blank');
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

    //Cargar los Tipos de Usuarios
    this.http.get('http://127.0.0.1:8000/gestion/tiposusuarios/').subscribe((res: any) => {
      this.tipoUsuarios = res;
    });
  }

  private updateTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000); // Actualiza cada segundo
  }
}

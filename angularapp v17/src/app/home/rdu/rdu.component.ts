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

  fecha_inicio_reporte= this.formatoFecha(new Date());
  fecha_fin_reporte= this.formatoFecha(new Date());

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
      fechaInicio: this.formatoFecha(new Date()),
      fechaFin:  this.formatoFecha(new Date()),
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
      this.dialogService.openMessageBox('error', 'Error', 'No se ha podido registrar la captura, puede que ya exista un registro con esa matricula.');
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

    

    }, (error: any) => {
      console.log(error);
      this.dialogService.openMessageBox('error', 'Error', 'No se ha podido obtener la información de la matricula o no existe.');
      return;
    });  



    //Limpiar el formulario
    this.visitaForm.reset();


  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  


  formatoFecha(fecha: Date): string {

   return fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
  }
    

  

  applyFilters() {
    const filters = this.consultaForm.value;
    let url = "http://127.0.0.1:8000/gestion/visitias/generarEstadisticasFront/"

    //Filtros
    //SOLO FECHA INICIO Y FECHA FIN EN FORMATO YYYY-MM-DD
    // Obtener la fecha actual
    let fechaInicio = filters.fechaInicio;
    let fechaFin = filters.fechaFin;
    let masculinos = false;
    let femeninos = false;
    let id_tipo_usuario = filters.tipoUsuario;
    let id_carrera = filters.id_carrera;

    url = url + '?fecha_inicio=' + fechaInicio + '&fecha_fin=' + fechaFin;
    //Si no existe ponla null
    if (filters.tipoUsuario === '') {
      id_tipo_usuario = null;
    }else{
      url = url + '&id_tipo_usuario=' + id_tipo_usuario;
    }
    
    if (filters.id_carrera === '') {
      id_carrera = null;
    }else{
      url = url + '&id_carrera=' + id_carrera;
    }

    //SEXOS
    if (filters.sexo === 'AMBOS') {
      masculinos = true;
      femeninos = true;
    } else if (filters.sexo === 'MASCULINO') {
      masculinos = true;
      femeninos = false;
    }
    else if (filters.sexo === 'FEMENINO') {
      femeninos = true;
      masculinos = false;
    }

    url = url + '&masculinos=' + masculinos + '&femeninos=' + femeninos;


    console.log("Fecha Inicio:",fechaInicio,"Fecha Fin:",fechaFin,"Masculinos:",masculinos,"Femeninos:",femeninos,"Tipo Usuario:",id_tipo_usuario,"Carrera:",id_carrera);

    // Traer todos los datos sin aplicar filtros
    this.http.get(url).subscribe((res: any) => {
      console.log(res);
      this.filteredData = res.registros_completos;
      //aplicar un pipe para filtrar por fecha, sexo, facultad, carrera y tipo de usuario
      console.log(this.filteredData);
      }, (error: any) => {
        console.log(error);
        this.dialogService.openMessageBox('error', 'Error', 'No se ha podido obtener los datos. Verifique los filtros ingresados.');
        this.filteredData = [];
      });
  }

  CONCENTRADO_RDU() {

    //Obtener fecha_inicio_reporte y fecha_fin_reporte
    let fechaInicio = this.fecha_inicio_reporte;
    let fechaFin = this.fecha_fin_reporte;

    //armar url
    let url = "http://127.0.0.1:8000/gestion/visitias/generarReporteFront/?fecha_inicio=" + fechaInicio + "&fecha_fin=" + fechaFin;
    //abrir nueva pestaña con el reporte  
    window.open(url, '_blank');
  }


  exportarExcel() {

    if (this.filteredData.length === 0) {
      this.dialogService.openMessageBox('info', 'Información', 'No hay datos para exportar.');
      return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivo(excelBuffer, 'ConsultaVisitas');
  }

  private guardarArchivo(buffer: any, fileName: string): void {

    const filters = this.consultaForm.value;

    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, fileName + '_(' + filters.fechaInicio+"_al_"+ filters.fechaFin + ').xlsx');
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

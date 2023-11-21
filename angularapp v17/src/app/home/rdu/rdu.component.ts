import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormsModule,FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-rdu',
  standalone: true,
  imports: [CommonModule,MaterialModule,FormsModule,ReactiveFormsModule,MatNativeDateModule,HttpClientModule],
  templateUrl: './rdu.component.html',
  styleUrl: './rdu.component.scss'
})

export class RduComponent implements OnInit  {
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
    private http: HttpClient
    ) {
    this.capturasForm = this.formBuilder.group({
      ID: '',
      nombre: '',
      sexo: '',
      esInterno: false,
      esExterno: false,
      fecha: new Date(),
      idFacultad: '',
      idCarrera: '',
      hora: '',
    });
    this.consultaForm = this.formBuilder.group({
      fechaInicio: new Date(),
      fechaFin: new Date(),
      idFacultad: '',
      idCarrera: '',
      esInterno: false,
      esExterno: false,
    });
  }

  toggleView(view: string) {
    this.view = view;
    console.log(view)
  }

  submitForm() {
    if (!this.capturasForm.valid) {
      return;
    }

    // Aquí puedes guardar los datos en tu backend o donde necesites
    const formData = this.capturasForm.value;
    this.data.push(formData);
    this.filteredData.push(formData);

    // Reiniciar formulario
    this.capturasForm.reset();
    this.capturasForm.patchValue({ fecha: new Date() });
  }

  applyFilters() {
    const filters = this.capturasForm.value;
    const rangeFromDate = filters.fecha ? filters.fecha[0] : null;
    const rangeToDate = filters.fecha ? filters.fecha[1] : null;

    // Aplicar filtros
    this.filteredData = this.data.filter(item => {
      let valid = true;

      if (filters.ID && !item.ID.includes(filters.ID)) {
        valid = false;
      }

      if (filters.nombre && !item.nombre.includes(filters.nombre)) {
        valid = false;
      }

      if (filters.idFacultad && !item.idFacultad.includes(filters.idFacultad)) {
        valid = false;
      }

      if (filters.idCarrera && !item.idCarrera.includes(filters.idCarrera)) {
        valid = false;
      }

      if (rangeFromDate && rangeToDate) {
        const date = new Date(item.fecha);
        const rangeFrom = new Date(rangeFromDate);
        const rangeTo = new Date(rangeToDate);

        if (date < rangeFrom || date > rangeTo) {
          valid = false;
        }
      }

      if (filters.esInterno && !item.esInterno) {
        valid = false;
      }

      if (filters.esExterno && !item.esExterno) {
        valid = false;
      }

      return valid;
    });
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

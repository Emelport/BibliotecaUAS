import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rdu',
  templateUrl: './rdu.component.html',
  styleUrls: ['./rdu.component.css']
})
export class RduComponent {
  capturasForm: FormGroup = new FormGroup({});
  view: string = 'capturar';
  data: any[] = [
    // Aquí puedes poner tus datos de ejemplo
  ];
  filteredData: any[] = [...this.data];

  constructor(private formBuilder: FormBuilder) {
    this.capturasForm = this.formBuilder.group({
      ID: '',
      nombre: '',
      sexo: '',
      esInterno: false,
      esExterno: false,
      fecha: new Date(),
      idFacultad: '',
      idCarrera: '',
      hora: ''
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
}
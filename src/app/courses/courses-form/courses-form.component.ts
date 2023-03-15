import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent {
  // um grupo de campos de um formulario e chamado de FormGroup
  form: FormGroup;

  // para criar o formulario de cadastro e necessario ter as classes FormBuilder e FormGroup. com isso e necessario importar o modulo ReactiveFormsModule
  // a classe FormBuilder vai ser usada para auxiliar na criacao de um FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      // campos do formulario
      name: [null],
      category: [null]
    });
  }
}

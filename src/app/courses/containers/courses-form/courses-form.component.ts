import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../model/courses';
import { CourseServiceService } from '../../service/course.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent {
  // um grupo de campos de um formulario e chamado de FormGroup
  // form: UntypedFormGroup;
  form = this.formBuilder.group({
    // campos do formulario
    id: [''],
    name: [''],
    category: [''],
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // para criar o formulario de cadastro e necessario ter as classes FormBuilder e FormGroup. com isso e necessario importar o modulo ReactiveFormsModule
  // a classe FormBuilder vai ser usada para auxiliar na criacao de um FormGroup
  constructor(private formBuilder: NonNullableFormBuilder, private courseService: CourseServiceService
    , private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {

    // this.form = this.formBuilder.group({
    //   // campos do formulario
    //   name: [''],
    //   category: [''l]
    // });

    const course: Courses = this.route.snapshot.data['course'];
    console.log(course);
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category,
    })
    // console.log(this.form.value)

  }

  onSubmit() {
    // console.log(this.form.value);
    // necessario se increver no observable para funcionar usando o subscribe()
    this.courseService.save(this.form.value).subscribe({ next: sucess => this.onSucess('Curso salvo com sucesso!'), error: error => this.onError('Erro ao salvar curso') });
  }

  onCancel() {
    // console.log('Cancel');
    this.location.back();
  }

  onSucess(message: string) {
    this.onSnackBar(message);
    this.onCancel();
  }

  onError(message: string) {
    this.onSnackBar(message);
  }

  onSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

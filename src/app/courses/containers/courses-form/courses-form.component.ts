import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
  coursesForm = this.formBuilder.group({
    // campos do formulario
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required]],
  });

  // para criar o formulario de cadastro e necessario ter as classes FormBuilder e FormGroup. com isso e necessario importar o modulo ReactiveFormsModule
  // a classe FormBuilder vai ser usada para auxiliar na criacao de um FormGroup
  constructor(private formBuilder: NonNullableFormBuilder, private courseService: CourseServiceService
    , private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {

    // this.coursesForm = this.formBuilder.group({
    //   // campos do formulario
    //   name: [''],
    //   category: [''l]
    // });

    const course: Courses = this.route.snapshot.data['course'];
    console.log(course);
    // seta o que foi retornado no resolver
    this.coursesForm.setValue({
      id: course.id,
      name: course.name,
      category: course.category,
    })
    // console.coursesForm(this.form.value)
  }

  onSubmit() {
    if(this.coursesForm.invalid){
      return ;
    }
    // console.log(this.coursesForm.value);
    // necessario se increver no observable para funcionar usando o subscribe()
    this.courseService.save(this.coursesForm.value).subscribe({ next: sucess => this.onSucess('Curso salvo com sucesso!'), error: error => this.onError('Erro ao salvar curso') });
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
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getErrorMessage(fieldName: string) {
    // .get('') metodo usado para referenciar o campo do formulario quando o formulario e do tipo .group
    const field = this.coursesForm.get(fieldName);
    // operador elvis ? se o campo tiver nullo ou  nao foi preenchido  ele nao vai apresentar erro
    // required valida se o campo estiver preechido;
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    // o nome da validacao tem que ser tudo menusculo para poder funcionar
    if (field?.hasError('minlength')) {
      // pega o tamanho necessario de caracters para poder informar qual e a quantidade de caracters
      //  field.errors se o erro existir ? field.errors['minlength'] ['requiredLength']obtem qual e o erro nesse caso acessou as propriedades  ['minlength'] e a outra propriedade ['requiredLength'] que e o tamanho requerido
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `O tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `O tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    return 'erro';

  }
}

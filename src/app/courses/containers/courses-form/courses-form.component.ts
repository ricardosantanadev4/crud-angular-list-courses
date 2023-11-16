import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CourseServiceService } from '../../service/course.service';


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent {

  // um grupo de campos de um formulario e chamado de FormGroup
  /* esse procedimento foi feito em aulas anteriores para tipar os campos do formulario como o 
     FormArray no angular poder ser um grupo de FormControls o angular nao trabalha com formularios 
     tipados em FormArrays */
  /* coursesForm = this.formBuilder.group({
     // inicializando os campos do formulario com vazio e tipando os campos
     id: [''],
     name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
     category: ['', [Validators.required]],
   }); */

  // ! permite declarar a variavel sem precisar inicializar
  coursesForm!: FormGroup;

  /* para criar o formulario de cadastro e necessario ter as classes FormBuilder e FormGroup. 
     com isso e necessario importar o modulo ReactiveFormsModule
     a classe FormBuilder vai ser usada para auxiliar na criacao de um FormGroup
     NonNullableFormBuilder siguinifica que os campos dormulario nao podem ser nulos */
  constructor(private formBuilder: NonNullableFormBuilder, private courseService: CourseServiceService
    , private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {

    /* this.coursesForm = this.formBuilder.group({
       campos do formulario
       name: [''],
       category: [''l]
     }); */

    //  esta recebento o return do resolver
    const course: Course = this.route.snapshot.data['course'];
    // console.log(course.lessons);

    // seta o que foi retornado no resolver
    /* this.coursesForm.setValue({
       id: course.id,
       name: course.name,
       category: course.category,
     }) */
    // console.log(this.coursesForm.value);

    /*  aqui e feito a declaracao e inializacao e tipagem do formulario ao mesmo tempo 
        para poder utilizar o FormArray */
    this.coursesForm = this.formBuilder.group({
      /* id: new FormControl([course.id]) e a mesma coisa que id: [course.id] 
         por isso os campos sao declarados da forma mais simples id: [course.id] */
      id: [course.id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      // transforma o array de FormGroup em um controle do Angular
      lessons: this.formBuilder.array(this.retrieveLesson(course), Validators.required)
    });

    // mostra o valores e os controles
    console.log(this.coursesForm);

    // mostra somente os valores
    // console.log(this.coursesForm.value);
  }

  /* esse metodo retorna um array de FormGroup, porem o Array de FormGroup e apenas uma lista nao e um
     controle do Angular para tornalo um controle vai ser necessario usar um FormArray */
  private retrieveLesson(course: Course) {
    const lessons = [];

    /* a variavel course pode ser nula e  quando tentar acessar lessons vai dar erro ex: null.lessons 
       por isso o uso do operador Elves ?. */
    // se o array tiver aulas executa o if, e se estiver vasio executa o else
    if (course?.lessons) {
      course.lessons.forEach(l => lessons.push(this.createLesson(l)));
    }
    else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  /* se nao for passado nenhum parametro quando chamar o metodo createLesson(), por padrao o parametro lesson do 
     metodo  vai ser inicializado com um objeto vazio */
  private createLesson(lesson: Lesson = { id: '', name: '', youtubeURL: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeURL: [lesson.youtubeURL, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    })
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.coursesForm.get('lessons')).controls
  }

  addNewLesson() {
    // necessario tipar o formulario como UntypedFormArray para o .push() poder funcionar
    const lessons = this.coursesForm.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  deleteLesson(index: number) {
    // necessario tipar o formulario como UntypedFormArray para o .removeAt() poder funcionar
    const lessons = this.coursesForm.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if (this.coursesForm.valid) {
      // console.log(this.coursesForm.value);
      // necessario se increver no observable para funcionar usando o subscribe()
      this.courseService.save(this.coursesForm.value).subscribe({
        next: () =>
          this.onSucess('Curso salvo com sucesso!'), error: () => this.onError('Erro ao salvar curso')
      });
    } else {
      alert('coursesForm inválido!');
    }

  }

  /* no lugar de usar router.navigate para voltar a tela inicial poder ser usado o location: Location
     faz o mesmo efeito porem com o location utliza menos codigo */
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
    // .get() metodo usado para referenciar o campo do formulario quando o formulario e do tipo .group
    const field = this.coursesForm.get(fieldName);

    // operador elvis ?. se o campo tiver nullo ou  nao foi preenchido  ele nao vai apresentar erro
    // required valida se o campo estiver preechido;
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    // o nome da validacao tem que ser tudo menusculo para poder funcionar
    if (field?.hasError('minlength')) {
      /* o doido a baixo pega o tamanho necessario de caracters para poder informar qual e a quantidade 
      de caracters */
      /*  field.errors se o erro existir ? field.errors['minlength'] ['requiredLength']obtem qual e o 
      erro nesse caso acessou as propriedades  ['minlength'] e a outra propriedade ['requiredLength'] 
      que e o tamanho requerido */
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

  idFormArrayRequered() {
    const lenssons = this.coursesForm.get('lessons') as UntypedFormArray;
    /* !lenssons.valid so vai retornar se o campo nao for valido
    /* lenssons.hasError('required') so retorna se o campo tiver erro 'required' 
       ou se ja se campo nao estiver preenchido */
    /* .touched utilizado para exibir uma mensagem somente quando campo e tocado, 
       se ele nao for utilizado a mensagem vai aparecer constantemente no compo */
    return !lenssons.valid && lenssons.hasError('required') && lenssons.touched;
  }
}
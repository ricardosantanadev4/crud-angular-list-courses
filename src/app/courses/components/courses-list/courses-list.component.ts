import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() coursesList: Course[] = [];
  @Output() addEventCoursesList = new EventEmitter(false);
  @Output() EditEventCoursesList = new EventEmitter(false);
  @Output() DeletEventCourseList = new EventEmitter(false);

  /* o ng-container da tabela faz apenas a declaracao da coluna, para pode exibir essa coluna na tabela e necessario 
  adicionar o nome dessa coluna na displayedColumns */
  /* readonly uma vez atribuindo um valor a essa variavel os dados dessa variavel nao podem ser alterados 
  em outro local sempre vai ser esses mesmos tanto a referencia quanto o referente e imutavel */
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {
  }

  onAddCoursesList() {
    console.log('addCoursesList');
    this.addEventCoursesList.emit(true);
  }

  onEditCoursesList(element: Course) {
    console.log('onEditCoursesList');
    this.EditEventCoursesList.emit(element);
  }

  onDeleteCourseList(element: Course) {
    console.log('onDeleteCourseList');
    this.DeletEventCourseList.emit(element);
  }

}
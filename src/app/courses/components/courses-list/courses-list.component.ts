import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Courses } from '../../model/courses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() coursesList: Courses[] = [];
  @Output() addEventCoursesList = new EventEmitter(false);
  @Output() EditEventCoursesList = new EventEmitter(false);
  // readonly indica que esse vai ser o objeto final, e garante que ele não permite que ele seja
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() { }

  onAddCoursesList() {
    console.log('addCoursesList');
    this.addEventCoursesList.emit(true);
  }

  onEditCoursesList(element: Courses) {
    console.log('onEditCoursesList');
    this.EditEventCoursesList.emit(element);
  }
  
}

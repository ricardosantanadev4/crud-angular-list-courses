import { Component } from '@angular/core';
import { Courses } from '../model/courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Courses[] = [{ _id: '1', name: 'Angular', category: 'front-end' }];
  displayedColumns = ['name', 'category']
}

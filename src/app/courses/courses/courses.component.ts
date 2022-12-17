import { Component } from '@angular/core';
import { Courses } from '../model/courses';
import { CourseServiceService } from '../service/course-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Courses[] = [];
  displayedColumns = ['name', 'category'];

  constructor(coursesService: CourseServiceService) {
    coursesService.getCourses().subscribe(courses => this.courses = courses);
  }
}

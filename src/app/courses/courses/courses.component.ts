import { Component } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Courses } from '../model/courses';
import { CourseServiceService } from '../service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<Courses[]>;
  displayedColumns = ['name', 'category'];

  constructor(coursesService: CourseServiceService) {
    this.courses$ = coursesService.getCourses().pipe(
      catchError(error => {
        console.log(error);
        return of([])
      })
    );
  }
}

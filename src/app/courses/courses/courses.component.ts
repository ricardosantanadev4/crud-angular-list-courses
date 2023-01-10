import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of, tap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/componets/error-dialog/error-dialog.component';
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

  constructor(coursesService: CourseServiceService, public dialog: MatDialog) {
    this.courses$ = coursesService.getCourses().pipe(
      catchError(error => {
        console.log(error);
        this.openDialog('Erro ao carregar recursos.');
        return of([])
      })
    );
  }

  openDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}

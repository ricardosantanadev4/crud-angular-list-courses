import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/componets/error-dialog/error-dialog.component';
import { Courses } from '../../model/courses';
import { CourseServiceService } from '../../service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<Courses[]>;

  // private route: ActivatedRoute rota atual
  constructor(coursesService: CourseServiceService, public dialog: MatDialog
    , private router: Router, private route: ActivatedRoute) {

    this.courses$ = coursesService.list().pipe(
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

  onAddCourses() {
    console.log('onAddCourses');
    // relativeTo: this.route pega a rota atual e agrega ao /new, com isso e possivel colocar somente ['new'] no lugar de ['courses/new'] e com isso facilita a manutencao ex: se o nome da rota courses for alterado para cursos a navegacao vai continuar funcionando
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditCourses(element: Courses) {
    console.log('onEditCourses');
    this.router.navigate(['edit', element.id], { relativeTo: this.route });
  }
}
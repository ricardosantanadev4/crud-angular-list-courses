import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CourseServiceService } from '../../service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;

  // private route: ActivatedRoute rota atual
  constructor(private coursesService: CourseServiceService, public dialog: MatDialog
    , private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {

    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      tap(c => console.log(c)),
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

  onEditCourses(element: Course) {
    console.log('onEditCourses');
    this.router.navigate(['edit', element.id], { relativeTo: this.route });
  }

  onDeletCourses(element: Course) {
    console.log('onDeletCourses');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log('The dialog was closed');
        console.log(result);
        if (result) {
          this.coursesService.remove(element.id)
            .subscribe({
              next: () => {
                this.refresh();
                this._snackBar.open('Curso Deletado com sucesso.', 'X', {
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  duration: 3000,
                })
              }, error: () => this.openDialog('Erro ao deletar curso!')
            });
        }
      }
    });
  }
}
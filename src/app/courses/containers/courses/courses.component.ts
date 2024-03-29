import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursePage } from '../../model/course-page';
import { CourseServiceService } from '../../service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // usado no inicio para testar a table
  // courses: Course[] =[{id: '', name: '', category: '', lessons: []}];

  // usado no inicio para verificar se a table estava buscando os dados atraves do servico
  // courses: Course[] = this.coursesService.courses;

  // usuado no incio para receber o [] do subscribe no list, porem como essa chamada e feita dentro
  // do construtor esse codigo foi comentado
  // courses$: Course[] = [];

  // dessa forma a variavel inicializado como nulo como isso e possivel criar um metodo e passar os valores no metodo
  // vindo do tipo Observable<Course[]> para essa variavel sem apresentar o erro que obriga iniciarlizar a variavel
  courses$: Observable<CoursePage> | null = null;

  // pageEvent!: PageEvent;
  // length = 50;
  pageSize = 10;
  pageIndex = 0;
  // pageSizeOptions = [5, 10, 15, 20];

  hidePageSize = false;
  showPageSizeOptions = true;
  // showFirstLastButtons = true;
  disabled = false;


  // usando a exclamcao no final da variavel o tipeScript nao obriga a inicializacao da variavel
  // tabem poderia ser feito dessa forma
  // courses$!: Observable<Course[]>;

  // private route: ActivatedRoute rota atual
  constructor(private coursesService: CourseServiceService, public dialog: MatDialog
    , private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private paginator: MatPaginatorIntl) {
    // com a evolucao do progeto foi necessario criar um metodo externamente para que ele fosse chamado 
    // dentro do contrutor e fora do construtor por isso esse codigo foi comentado
    // coursesService.list().subscribe(c => this.courses$ = c);

    this.refresh();
    this.paginatorLabel(paginator);
  }

  /* dessa forma nao e obrigado passa os paramentros no metodo  quando o metodo refresh() e acionado 
     refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) */
  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(() => {
        // console.log(error);
        this.openDialog('Erro ao carregar recursos.');
        /* of({ course: [], totalElements: 0 } as Page) forca a tipagem para o tipo Page passando a ser um Observable<Page> no lugar de 
        Observable<Page | never[]> que seria no caso do uso do of([]) que nao e o mesmo tipo de courses$ */
        return of({ course: [], totalElements: 0 } as CoursePage);
      })
    );
  }

  // refresh(pageIndex: number, pageSize: number) {
  //   return this.coursesService.list(pageIndex, pageSize).subscribe(p => { this.page = p, this.courses = this.page.course });
  // }

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

  // metodo que traduz os rotulos do paginator
  paginatorLabel(paginator: MatPaginatorIntl) {
    paginator.itemsPerPageLabel = 'Itens por página';
    paginator.firstPageLabel = 'Primeira página';
    paginator.previousPageLabel = 'Página anterior';
    paginator.nextPageLabel = 'Próxima página';
    paginator.lastPageLabel = 'Última página';
    paginator.getRangeLabel = this.getRangeLabel;
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    const totalPages = length / pageSize;
    return `Exibindo de ${startIndex + 1} até ${endIndex} - Total Listado ${length} - Página ${page + 1} - Total de páginas ${totalPages}`;
  };
}
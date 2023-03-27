import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from '../model/courses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() coursesList: Courses[] = [];
  // readonly indica que esse vai ser o objeto final, e garante que ele não permite que ele seja
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  onAdd() {
    console.log('onAdd');
    // relativeTo: this.route pega a rota atual e agrega ao /new, com isso e possivel colocar somente ['new'] no lugar de ['courses/new'] e com isso facilita a manutencao ex: se o nome da rota courses for alterado para cursos a navegacao vai continuar funcionando
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}

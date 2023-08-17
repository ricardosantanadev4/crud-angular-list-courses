import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // path: '' significa que o caminha esta vazio no caso so seria http://localhost:4200/
  // pathMatch: 'full' verifica todo o roteamento http://localhost:4200 ou http://localhost:4200 para poder fazer o direcionamento para courses
  //  redirectTo: 'courses' faz o redirecionamento para a rota courses
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

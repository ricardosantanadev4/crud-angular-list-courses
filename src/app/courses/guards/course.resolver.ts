import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';
import { CourseServiceService } from '../service/course.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {

  constructor(private courseService: CourseServiceService) { }

  // RouterStateSnapshot contem uma copia da rota por um determinado periodo de tempo com isso e possivel obter informacoes da rota ex o id que e o paramentro da rota
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

    if (route.params && route.params['id']) {
      return this.courseService.loadById(route.params['id']);
    }
    return of({ id: '', name: '', category: '', lessons: [] });
  }
}

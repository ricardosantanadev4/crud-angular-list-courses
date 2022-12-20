import { Injectable } from '@angular/core';
import { Courses } from '../model/courses';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  //  courses: Courses[] = [{ _id: '1', name: 'Angular', category: 'front-end' }];
  private readonly API = 'http://localhost:3000/value1';
  constructor(private httpClient: HttpClient) {

  }
  getCourses() {
    return this.httpClient.get<Courses[]>(this.API).pipe(
      first(),
      delay(5000),
      // tap(courses => console.log(courses))      
    );
  }

}

import { Injectable } from '@angular/core';
import { Courses } from '../model/courses';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  //  courses: Courses[] = [{ _id: '1', name: 'Angular', category: 'front-end' }];
  private readonly API = 'http://localhost:3000/value';
  constructor(private httpClient: HttpClient) {

  }
  getCourses() {
    return this.httpClient.get<Courses[]>(this.API);
  }

}

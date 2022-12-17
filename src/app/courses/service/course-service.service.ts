import { Injectable } from '@angular/core';
import { Courses } from '../model/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  couses: Courses[] = [{ _id: '1', name: 'Angular', category: 'front-end' }];

  constructor() { }

  getCourses() {
    return this.couses;
  }
}

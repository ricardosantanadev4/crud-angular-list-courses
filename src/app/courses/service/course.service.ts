import { Injectable } from '@angular/core';
import { Courses } from '../model/courses';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  //  courses: Courses[] = [{ _id: '1', name: 'Angular', category: 'front-end' }];
  // private readonly API = 'http://localhost:3000/value';
  private readonly API = '/api/courses';

  constructor(private httpClient: HttpClient) {

  }


  list() {
    return this.httpClient.get<Courses[]>(this.API).pipe(
      // first() se increve no observable e quando vem a primeira resposta se desinscreve do observable
      first(),
      // delay(5000),
      // tap(courses => console.log(courses))
    );
  }

  save(record: Partial<Courses>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Courses>) {
    return this.httpClient.post<Courses>(this.API, record);
  }

  private update(record: Partial<Courses>) {
    return this.httpClient.put<Courses>(`${this.API}/${record.id}`, record);
  }

  loadById(id: string) {
    // `${this.API}/${id}` concatena a url da API com o id
    return this.httpClient.get<Courses>(`${this.API}/${id}`);
  }
}
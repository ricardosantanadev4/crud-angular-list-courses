import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  // usado no inicio para verificar testar a table
  //  courses: Course[] = [{id: '', name: '', category: '', lessons: []}];

  // usado no inicio do progeto para testar table usando o HttpClient sem precisar de conectar ao back-end
  // private readonly API = 'http://localhost:3000/courses';

  // private readonly API = '/api/courses';

  constructor(private httpClient: HttpClient) {

  }

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      // first() se increve no observable e quando vem a primeira resposta se desinscreve do observable
      first(),
      // delay(5000),
      // tap(courses => console.log(courses))
    );
  }

  save(record: Partial<Course>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record);
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record.id}`, record);
  }

  loadById(id: string) {
    // `${this.API}/${id}` concatena a url da API com o id
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  remove(id: string) {
    // como vai ser retornado pela API um objeto do tipo void o observable não é tipado
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
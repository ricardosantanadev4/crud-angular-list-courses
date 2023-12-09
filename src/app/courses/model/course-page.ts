import { Course } from "./course";

export interface CoursePage {
    course: Course[];
    totalElements: number;
    //  usando o operador elves no atributo totalPages ele pode ser undfined ou seja ele nao precisa ser declarado em outra classe no tipo Page
    totalPages?: number;
}
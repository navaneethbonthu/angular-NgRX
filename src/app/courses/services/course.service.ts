import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { enviroments } from 'src/app/enviroments/enviroment';
import { Course } from 'src/app/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  createCourse(course: Course): Observable<{ name: string }> {
    const url = `${enviroments.firebaseConfig.databaseURL}/courses.json`;
    return this.http.post<{ name: string }>(url, course);
  }

  readCourses(): Observable<Course[]> {
    return this.http
      .get(`${enviroments.firebaseConfig.databaseURL}/courses.json`)
      .pipe(
        map((data) => {
          const courses: Course[] = [];
          for (let key in data) {
            const course = { ...data[key], id: key };
            courses.push(course);
          }
          return courses;
        })
      );
  }

  updateCourses(course: Course) {
    const courseData = {
      [course.id]: {
        title: course.title,
        description: course.description,
        author: course.author,
        price: course.price,
        image: course.image,
      },
    };
    return this.http.patch(
      `${enviroments.firebaseConfig.databaseURL}/courses.json`,
      courseData
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(
      `${enviroments.firebaseConfig.databaseURL}/courses/${id}.json`
    );
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(
      `${enviroments.firebaseConfig.databaseURL}/courses/${id}.json`
    );
  }
}

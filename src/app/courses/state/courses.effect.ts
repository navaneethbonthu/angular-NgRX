import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCourse,
  createCourseSuccess,
  deleteCourse,
  deleteCourseSuccess,
  readCourses,
  readCourseSuccess,
  updateCourse,
  updateCourseSuccess,
} from './courses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from 'src/app/models/course.model';
import { setErrorMessage } from 'src/app/shared/shared.actions';

@Injectable()
export class CoursesEffect {
  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) {}

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCourse),
      mergeMap((action) => {
        return this.courseService.createCourse(action.course).pipe(
          map((data) => {
            const course: Course = { ...action.course, id: data.name };
            return createCourseSuccess({ course });
          }),
          catchError((error) => {
            const message = 'Something went worng. Course can not be craeted';
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });

  readCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(readCourses),
      mergeMap((action) => {
        return this.courseService.readCourses().pipe(
          map((data) => {
            // const course: Course = { ...action.course, id: data.name };
            console.log(data);

            return readCourseSuccess({ courses: data });
          }),
          catchError((error) => {
            const message = 'Something went worng. Course can not be read';
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCourse),
      mergeMap((action) => {
        return this.courseService.updateCourses(action.course).pipe(
          map((data) => {
            return updateCourseSuccess({ course: action.course });
          }),
          catchError((error) => {
            const message = 'Something went worng. Course can not be updated';
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });
  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCourse),
      mergeMap((action) => {
        return this.courseService.deleteCourse(action.id).pipe(
          map((data) => {
            return deleteCourseSuccess({ id: action.id });
          }),
          catchError((error) => {
            const message = 'Something went worng. Course can not be deleted';
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });
}

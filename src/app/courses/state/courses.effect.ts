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
import { catchError, delay, filter, map, mergeMap, of, switchMap } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from 'src/app/models/course.model';
import { setErrorMessage } from 'src/app/shared/shared.actions';
import {
  ROUTER_NAVIGATED,
  RouterNavigatedAction,
  RouterNavigationAction,
} from '@ngrx/router-store';

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
            delay(0);
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

  getCourseById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/courses/course');
      }),
      map((r: RouterNavigatedAction) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.courseService.getCourseById(id).pipe(
          map((course) => {
            const courseData = [{ ...course, id }];
            return readCourseSuccess({ courses: courseData });
          })
        );
      })
    );
  });
}

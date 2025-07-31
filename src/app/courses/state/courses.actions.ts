import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';

export const showForm = createAction('showForm', props<{ value: boolean }>());

export const createCourse = createAction(
  'createCourse',
  props<{ course: Course }>()
);

export const createCourseSuccess = createAction(
  '[courses] create course success',
  props<{ course: Course }>()
);

export const readCourses = createAction('[courses] read course');

export const readCourseSuccess = createAction(
  '[courses] read course success',
  props<{ courses: Course[] }>()
);

// export const setEditMode = createAction(
//   'setEditMode',
//   props<{ editMode: boolean }>()
// );

// export const setSelectedCourse = createAction(
//   'setSelectedCourse',
//   props<{ course: Course }>()
// );

export const updateCourse = createAction(
  '[courses] update course',
  props<{ course: Course }>()
);

export const updateCourseSuccess = createAction(
  '[courses] update course success',
  props<{ course: Update<Course> }>()
);

export const deleteCourse = createAction(
  '[courses]  delete course',
  props<{ id: string }>()
);

export const deleteCourseSuccess = createAction(
  '[courses]  delete course success',
  props<{ id: string }>()
);

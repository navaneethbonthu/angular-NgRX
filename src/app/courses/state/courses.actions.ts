import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';

export const showForm = createAction('showForm', props<{ value: boolean }>());

export const createCourse = createAction(
  'createCourse',
  props<{ course: Course }>()
);

export const setEditMode = createAction(
  'setEditMode',
  props<{ editMode: boolean }>()
);

export const setSelectedCourse = createAction(
  'setSelectedCourse',
  props<{ course: Course }>()
);

export const updateCourse = createAction(
  'updateCourse',
  props<{ course: Course }>()
);

export const deleteCourse = createAction(
  '[courses]  delete course',
  props<{ id: number }>()
);

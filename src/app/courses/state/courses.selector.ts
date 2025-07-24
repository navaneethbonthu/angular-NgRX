import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';

export const getCourseState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(getCourseState, (state) => {
  return state.courses;
});

export const showForm = createSelector(getCourseState, (state) => {
  return state.showForm;
});

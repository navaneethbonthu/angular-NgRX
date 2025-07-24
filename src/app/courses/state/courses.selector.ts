import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';
import { COURSES_STATE } from 'src/app/constants';

export const getCourseState =
  createFeatureSelector<CoursesState>(COURSES_STATE);

export const getShowForm = createSelector(getCourseState, (state) => {
  return state.showForm;
});

export const getCourses = createSelector(getCourseState, (state) => {
  return state.courses;
});

export const getEditMode = createSelector(getCourseState, (state) => {
  return state.isEditMode;
});

export const getSelectedCourse = createSelector(getCourseState, (state) => {
  return state.selectedCouse;
});

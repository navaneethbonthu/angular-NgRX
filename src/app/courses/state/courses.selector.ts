import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';
import { COURSES_STATE } from 'src/app/constants';
import {
  getQueryParams,
  getRouterParams,
} from 'src/app/store/router/router.selector';
import { Params } from '@angular/router';

export const getCourseState =
  createFeatureSelector<CoursesState>(COURSES_STATE);

export const getShowForm = createSelector(getCourseState, (state) => {
  return state.showForm;
});

export const getCourses = createSelector(getCourseState, (state) => {
  return state.courses;
});

// export const getEditMode = createSelector(getCourseState, (state) => {
//   return state.isEditMode;
// });

// export const getSelectedCourse = createSelector(getCourseState, (state) => {
//   return state.selectedCouse;
// });

export const getCourseByIdParams = createSelector(
  getCourseState,
  getRouterParams,
  (state, params: Params) => {
    return state.courses.find((course) => course.id === params['id']);
  }
);

export const getCourseByIdQueryParams = createSelector(
  getCourseState,
  getQueryParams,
  (state, params: Params) => {
    return state.courses.find((course) => course.id === params['id']);
  }
);

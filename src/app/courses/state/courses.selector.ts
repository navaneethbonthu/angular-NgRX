import { createFeatureSelector, createSelector } from '@ngrx/store';
import { courseAdapter, CoursesState } from './courses.state';
import { COURSES_STATE } from 'src/app/constants';
import {
  getQueryParams,
  getRouterParams,
} from 'src/app/store/router/router.selector';
import { Params } from '@angular/router';

export const getCourseState =
  createFeatureSelector<CoursesState>(COURSES_STATE);

const { selectAll } = courseAdapter.getSelectors();

export const getShowForm = createSelector(getCourseState, (state) => {
  return state.showForm;
});

export const getCourses = createSelector(getCourseState, (state) => {
  return selectAll(state);
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
    return selectAll(state).find((course) => course.id === params['id']);
  }
);

export const getCourseByIdQueryParams = createSelector(
  getCourseState,
  getQueryParams,
  (state, params: Params) => {
    return selectAll(state).find((course) => course.id === params['id']);
  }
);

export const selecteCousesLoaded = createSelector(getCourseState, (state) => {
  return state.loaded;
});

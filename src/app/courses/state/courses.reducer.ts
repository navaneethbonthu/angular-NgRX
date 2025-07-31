import { createReducer, on } from '@ngrx/store';
import { courseAdapter, initialState } from './courses.state';
import {
  createCourseSuccess,
  deleteCourse,
  deleteCourseSuccess,
  readCourseSuccess,
  // setEditMode,
  // setSelectedCourse,
  showForm,
  updateCourseSuccess,
} from './courses.actions';

export const courseReducer = createReducer(
  initialState,
  on(showForm, (state, action) => {
    return {
      ...state,
      showForm: action.value,
    };
  }),
  on(createCourseSuccess, (state, action) => {
    return courseAdapter.addOne(action.course, state);
  }),

  on(updateCourseSuccess, (state, action) => {
    return courseAdapter.updateOne(action.course, state);

    // const updCourse = state.courses.map((c) => {
    //   if (c.id === action.course.id) {
    //     return action.course;
    //   } else {
    //     return c;
    //   }
    // });
    // return {
    //   ...state,
    //   courses: updCourse,
    // };
  }),
  on(deleteCourseSuccess, (state, action) => {
    return courseAdapter.removeOne(action.id, state);
    // const udatedArr = state.courses.filter((cor) => cor.id !== action.id);

    // return {
    //   ...state,
    //   courses: udatedArr,
    // };
  }),
  on(readCourseSuccess, (state, action) => {
    return courseAdapter.setAll(action.courses, { ...state, loaded: true });
    // return {
    //   ...state,
    //   courses: action.courses,
    // };
  })
);

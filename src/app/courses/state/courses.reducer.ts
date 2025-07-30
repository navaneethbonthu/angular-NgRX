import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
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
    // const course = { ...action.course };
    // course.id = (state.courses.length + 1).toString();
    return {
      ...state,
      courses: [...state.courses, action.course],
    };
  }),
  // on(setEditMode, (state, action) => {
  //   return {
  //     ...state,
  //     isEditMode: action.editMode,
  //   };
  // }),
  // on(setSelectedCourse, (state, action) => {
  //   return {
  //     ...state,
  //     selectedCouse: action.course,
  //   };
  // }),
  on(updateCourseSuccess, (state, action) => {
    const updCourse = state.courses.map((c) => {
      if (c.id === action.course.id) {
        return action.course;
      } else {
        return c;
      }
    });
    return {
      ...state,
      courses: updCourse,
    };
  }),
  on(deleteCourseSuccess, (state, action) => {
    const udatedArr = state.courses.filter((cor) => cor.id !== action.id);

    return {
      ...state,
      courses: udatedArr,
    };
  }),
  on(readCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses,
    };
  })
);

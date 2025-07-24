import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import {
  createCourse,
  deleteCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
  updateCourse,
} from './courses.actions';

export const courseReducer = createReducer(
  initialState,
  on(showForm, (state, action) => {
    return {
      ...state,
      showForm: action.value,
    };
  }),
  on(createCourse, (state, action) => {
    const course = { ...action.course };
    course.id = state.courses.length + 1;
    return {
      ...state,
      courses: [...state.courses, course],
    };
  }),
  on(setEditMode, (state, action) => {
    return {
      ...state,
      isEditMode: action.editMode,
    };
  }),
  on(setSelectedCourse, (state, action) => {
    return {
      ...state,
      selectedCouse: action.course,
    };
  }),
  on(updateCourse, (state, action) => {
    console.log('reducer called');

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
  on(deleteCourse, (state, action) => {
    const udatedArr = state.courses.filter((cor) => cor.id !== action.id);

    return {
      ...state,
      courses: udatedArr,
    };
  })
);

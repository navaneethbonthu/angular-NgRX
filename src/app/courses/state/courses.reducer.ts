import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import { showCrateForm } from './courses.actions';

export const courseReducer = createReducer(
  initialState,
  on(showCrateForm, (state, action) => {
    return {
      ...state,
      showForm: action.value,
    };
  })
);

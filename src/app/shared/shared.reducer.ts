import { createReducer, on } from '@ngrx/store';
import { intitialState } from '../auth/states/auth.state';
import { setErrorMessage, setIsLoading } from './shared.actions';

export const sharedReducer = createReducer(
  intitialState,
  on(setIsLoading, (state, action) => {
    return {
      ...state,
      isLoading: action.value,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

import { createReducer, on } from '@ngrx/store';
import { intitialState } from './auth.state';
import { loginStart, loginSuccess } from './auth.actions';

export const authReducer = createReducer(
  intitialState,
  on(loginSuccess, (state, action) => {
    console.log(action.user);

    return {
      ...state,
      user: action.user,
    };
  })
);

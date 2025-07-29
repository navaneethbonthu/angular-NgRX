import { createReducer, on } from '@ngrx/store';
import { intitialState } from './auth.state';
import {
  loginStart,
  loginSuccess,
  logout,
  signupSuccess,
} from './auth.actions';

export const authReducer = createReducer(
  intitialState,
  on(loginSuccess, (state, action) => {
    console.log(action.user);

    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logout, (state, action) => {
    return {
      ...state,
      user: null,
    };
  })
);

import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { authReducer } from '../auth/states/auth.reducer';
import { AuthState } from '../auth/states/auth.state';
import { sharedReducer } from '../shared/shared.reducer';
import { sharedState } from '../shared/shared.state';

export interface AppState {
  auth: AuthState;
  shared: sharedState;
  router: RouterReducerState;
}

export const appReducer = {
  auth: authReducer,
  shared: sharedReducer,
  router: routerReducer,
};

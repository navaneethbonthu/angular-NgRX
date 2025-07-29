import { authReducer } from '../auth/states/auth.reducer';
import { AuthState } from '../auth/states/auth.state';
import { sharedReducer } from '../shared/shared.reducer';
import { sharedState } from '../shared/shared.state';

export interface AppState {
  auth: AuthState;
  shared: sharedState;
}

export const appReducer = {
  auth: authReducer,
  shared: sharedReducer,
};

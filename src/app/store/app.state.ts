import { authReducer } from '../auth/states/auth.reducer';
import { AuthState } from '../auth/states/auth.state';
import { AUTH_STATE } from '../constants';

export interface AppState {
  [AUTH_STATE]: AuthState;
}

export const appReducer = {
  [AUTH_STATE]: authReducer,
};

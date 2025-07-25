import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loginStart = createAction(
  '[auth] login start',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[auth] login success',
  props<{ user: User }>()
);

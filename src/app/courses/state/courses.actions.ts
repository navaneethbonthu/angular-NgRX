import { createAction, props } from '@ngrx/store';

export const showCrateForm = createAction(
  'showForm',
  props<{ value: boolean }>()
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sharedState } from './shared.state';
import { SHARED_STATE } from '../constants';

export const getSharedState = createFeatureSelector<sharedState>(SHARED_STATE);

export const getIsLoading = createSelector(getSharedState, (state) => {
  return state.isLoading;
});

export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
});

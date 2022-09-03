import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';

export const selectData = (state: AppState) => state.data;

export const selectDataTags = createSelector(selectData, state => state.tags);
export const selectDataItems = createSelector(selectData, state => state.items);
export const selectDataIsLoading = createSelector(selectData, state => state.isLoading);
export const selectDataApiError = createSelector(selectData, state => state.error);

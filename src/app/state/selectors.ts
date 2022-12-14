import { createSelector } from '@ngrx/store';
import { IAppState } from './reducers';

export const selectData = (state: IAppState) => state.data;

export const selectDataTags = createSelector(selectData, state => state.tags);
export const selectDataIsLoading = createSelector(selectData, state => state.isLoading);
export const selectDataApiError = createSelector(selectData, state => state.error);

export const selectFlipCardsState = createSelector(selectData, state => state.flipCards);
export const selectFlipCardItems = createSelector(selectFlipCardsState, state => state.items);
export const selectFlipCardItemsCount = createSelector(selectFlipCardsState, state => state.items.length);
export const selectFlipCardActualIndex = createSelector(selectFlipCardsState, state => state.actualIndex);
export const selectFlipCardResults = createSelector(selectFlipCardsState, state => state.results);

export const selectMultipleChoiceState = createSelector(selectData, state => state.multipleChoice);
export const selectMultipleChoiceItems = createSelector(selectMultipleChoiceState, state => state.items);
export const selectMultipleChoiceItemsCount = createSelector(selectMultipleChoiceState, state => state.items.length);
export const selectMultipleChoiceActualIndex = createSelector(selectMultipleChoiceState, state => state.actualIndex);
export const selectMultipleChoiceResults = createSelector(selectMultipleChoiceState, state => state.results);

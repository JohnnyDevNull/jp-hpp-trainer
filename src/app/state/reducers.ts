import { createReducer, on } from '@ngrx/store';
import { IData, IFlipCardDataItem, IMultipleChoiceDataItem } from '../data.interface';
import { UpdateFlipCardActualIndex, UpdateFlipCardResults } from './actions';
import * as Actions from './actions';

export interface IResultsCounter {
  wrongCount: number;
  rightCount: number;
}

export interface IDataState extends IData {
  flipCards: {
    items: IFlipCardDataItem[];
    actualIndex: number;
    results: IResultsCounter;
  };
  multipleChoice: {
    items: IMultipleChoiceDataItem[];
    actualIndex: number;
    results: IResultsCounter;
  };
  isLoading: boolean;
  error: Error | null;
}

export const initialState: IDataState = {
  tags: [],
  flipCards: {
    items: [],
    actualIndex: 0,
    results: {
      wrongCount: 0,
      rightCount: 0,
    },
  },
  multipleChoice: {
    items: [],
    actualIndex: 0,
    results: {
      wrongCount: 0,
      rightCount: 0,
    },
  },
  isLoading: false,
  error: null,
};

const dataReducerInternal = createReducer(
  initialState,
  on(Actions.LoadData, (state): IDataState => ({ ...state, isLoading: true, error: null })),
  on(Actions.ReLoadData, (state): IDataState => ({ ...state, isLoading: true, error: null })),
  on(
    Actions.LoadDataSuccess,
    (state, { payload }): IDataState => ({
      ...state,
      flipCards: {
        ...state.flipCards,
        items: [...payload.flipCards.items],
      },
      multipleChoice: {
        ...state.multipleChoice,
        items: [...payload.multipleChoice.items],
      },
      isLoading: false,
      error: null,
    }),
  ),
  on(
    Actions.LoadDataFailure,
    (state, { payload }): IDataState => ({
      ...state,
      isLoading: false,
      error: payload,
    }),
  ),
  on(
    UpdateFlipCardActualIndex,
    (state, { payload }): IDataState => ({
      ...state,
      flipCards: { ...state.flipCards, actualIndex: payload.actualIndex },
    }),
  ),
  on(
    UpdateFlipCardResults,
    (state, { payload }): IDataState => ({
      ...state,
      flipCards: { ...state.flipCards, results: payload.results },
    }),
  ),
);

export interface IAppState {
  data: IDataState;
}

export const appReducers = {
  data: dataReducerInternal,
};

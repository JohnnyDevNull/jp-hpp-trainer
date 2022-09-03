import { Action, createReducer, on } from '@ngrx/store';
import { IData } from '../data.interface';
import * as Actions from './actions';

export interface AppState {
  data: IData & { isLoading: boolean; error: Error | null };
}

export const initialState: AppState = {
  data: {
    tags: [],
    items: [],
    isLoading: false,
    error: null,
  },
};

const appReducerInternal = createReducer(
  initialState,
  on(Actions.LoadData, (state): AppState => ({ ...state, data: { ...state.data, isLoading: true, error: null } })),
  on(Actions.ReLoadData, (state): AppState => ({ ...state, data: { ...state.data, isLoading: true, error: null } })),
  on(
    Actions.LoadDataSuccess,
    (state, { payload }): AppState => ({
      ...state,
      data: { ...state.data, ...payload, isLoading: false, error: null },
    }),
  ),
  on(
    Actions.LoadDataFailure,
    (state, { payload }): AppState => ({
      ...state,
      data: { ...state.data, isLoading: false, error: payload },
    }),
  ),
);

export function appReducer(state: AppState, action: Action): AppState {
  return appReducerInternal(state, action);
}

import { createAction, props } from '@ngrx/store';
import { IData } from '../data.interface';

export const LoadData = createAction('[Data API] Load Data');

export const ReLoadData = createAction('[Data API] Re-Load Data');

export const LoadDataSuccess = createAction('[Data API] Load Data Success', props<{ payload: IData }>());

export const LoadDataFailure = createAction('[Data API] Load Data Failure', props<{ payload: Error }>());

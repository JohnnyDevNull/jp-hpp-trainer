import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { DataService } from '../data.service';
import { LoadData, LoadDataFailure, LoadDataSuccess } from './actions';

@Injectable()
export class AppEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadData),
      exhaustMap(() =>
        this.dataService.fetchData().pipe(
          map(data => LoadDataSuccess({ payload: data })),
          catchError(error => of(LoadDataFailure({ payload: error }))),
        ),
      ),
    ),
  );

  loadDataFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoadDataFailure),
        tap(action => console.error(action.payload)),
      ),
    { dispatch: false },
  );

  constructor(private readonly actions$: Actions, private readonly dataService: DataService) {}
}

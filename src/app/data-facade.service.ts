import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, take } from 'rxjs';
import { IDataTag, IFlipCardDataItem, IMultipleChoiceDataItem } from './data.interface';
import { LoadData, ReLoadData, UpdateFlipCardActualIndex, UpdateFlipCardResults } from './state/actions';
import { IAppState, IResultsCounter } from './state/reducers';
import {
  selectDataApiError,
  selectDataIsLoading,
  selectDataTags,
  selectFlipCardActualIndex,
  selectFlipCardItems,
  selectFlipCardItemsCount,
  selectFlipCardResults,
  selectMultipleChoiceItems,
} from './state/selectors';

@Injectable({ providedIn: 'root' })
export class DataFacadeService {
  dataTags$: Observable<IDataTag[]>;
  dataIsLoading$: Observable<boolean>;
  dataApiError$: Observable<Error | null>;
  flipCardItems$: Observable<IFlipCardDataItem[]>;
  flipCardItemsCount$: Observable<number>;
  flipCardActualIndex$: Observable<number>;
  flipCardResults$: Observable<IResultsCounter>;
  multipleChoiceItems$: Observable<IMultipleChoiceDataItem[]>;

  public constructor(private readonly store: Store<IAppState>) {
    this.dataTags$ = this.store.select(selectDataTags);
    this.flipCardItems$ = this.store.select(selectFlipCardItems);
    this.flipCardItemsCount$ = this.store.select(selectFlipCardItemsCount);
    this.flipCardActualIndex$ = this.store.select(selectFlipCardActualIndex);
    this.flipCardResults$ = this.store.select(selectFlipCardResults);
    this.multipleChoiceItems$ = this.store.select(selectMultipleChoiceItems);
    this.dataIsLoading$ = this.store.select(selectDataIsLoading);
    this.dataApiError$ = this.store.select(selectDataApiError);
  }

  public load(reload = false) {
    this.store.dispatch(reload ? ReLoadData() : LoadData());
  }

  public getFlipCardById(id: number) {
    return this.flipCardItems$.pipe(switchMap(items => of(items.find(i => i.id === id) || null)));
  }

  public getFlipCardByIndex(index: number) {
    return this.flipCardItems$.pipe(switchMap(items => of(items[index] || null)));
  }

  public prevFlipCard() {
    this.store
      .select(selectFlipCardActualIndex)
      .pipe(take(1))
      .subscribe(actualIndex =>
        this.store.dispatch(UpdateFlipCardActualIndex({ payload: { actualIndex: actualIndex - 1 } })),
      );
  }

  public nextFlipCard() {
    this.store
      .select(selectFlipCardActualIndex)
      .pipe(take(1))
      .subscribe(actualIndex =>
        this.store.dispatch(UpdateFlipCardActualIndex({ payload: { actualIndex: actualIndex + 1 } })),
      );
  }

  public incFlipCardRightCount() {
    this.store
      .select(selectFlipCardResults)
      .pipe(take(1))
      .subscribe(resultCount =>
        this.store.dispatch(
          UpdateFlipCardResults({
            payload: { results: { rightCount: resultCount.rightCount + 1, wrongCount: resultCount.wrongCount } },
          }),
        ),
      );
  }

  public incFlipCardWrongCount() {
    this.store
      .select(selectFlipCardResults)
      .pipe(take(1))
      .subscribe(resultCount =>
        this.store.dispatch(
          UpdateFlipCardResults({
            payload: { results: { rightCount: resultCount.rightCount, wrongCount: resultCount.wrongCount + 1 } },
          }),
        ),
      );
  }
}

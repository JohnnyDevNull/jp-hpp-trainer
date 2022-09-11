import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, take } from 'rxjs';
import { IMultipleChoiceDataItem } from '../../data.interface';
import { UpdateMultipleChoiceActualIndex, UpdateMultipleChoiceResults } from '../../state/actions';
import { IAppState, IResultsCounter } from '../../state/reducers';
import {
  selectMultipleChoiceActualIndex,
  selectMultipleChoiceItems,
  selectMultipleChoiceItemsCount,
  selectMultipleChoiceResults,
} from '../../state/selectors';

@Injectable({ providedIn: 'root' })
export class MultipleChoiceFacadeService {
  multipleChoiceItems$: Observable<IMultipleChoiceDataItem[]>;
  multipleChoiceItemsCount$: Observable<number>;
  multipleChoiceActualIndex$: Observable<number>;
  multipleChoiceResults$: Observable<IResultsCounter>;

  public constructor(private readonly store: Store<IAppState>) {
    this.multipleChoiceItems$ = this.store.select(selectMultipleChoiceItems);
    this.multipleChoiceItemsCount$ = this.store.select(selectMultipleChoiceItemsCount);
    this.multipleChoiceActualIndex$ = this.store.select(selectMultipleChoiceActualIndex);
    this.multipleChoiceResults$ = this.store.select(selectMultipleChoiceResults);
  }

  public getMultipleChoiceByIndex(index: number) {
    return this.multipleChoiceItems$.pipe(switchMap(items => of(items[index] || null)));
  }

  public prevMultipleChoice() {
    this.store
      .select(selectMultipleChoiceActualIndex)
      .pipe(take(1))
      .subscribe(actualIndex =>
        this.store.dispatch(UpdateMultipleChoiceActualIndex({ payload: { actualIndex: actualIndex - 1 } })),
      );
  }

  public nextMultipleChoice() {
    this.store
      .select(selectMultipleChoiceActualIndex)
      .pipe(take(1))
      .subscribe(actualIndex =>
        this.store.dispatch(UpdateMultipleChoiceActualIndex({ payload: { actualIndex: actualIndex + 1 } })),
      );
  }

  public incMultipleChoiceRightCount() {
    this.store
      .select(selectMultipleChoiceResults)
      .pipe(take(1))
      .subscribe(resultCount =>
        this.store.dispatch(
          UpdateMultipleChoiceResults({
            payload: { results: { rightCount: resultCount.rightCount + 1, wrongCount: resultCount.wrongCount } },
          }),
        ),
      );
  }

  public incMultipleChoiceWrongCount() {
    this.store
      .select(selectMultipleChoiceResults)
      .pipe(take(1))
      .subscribe(resultCount =>
        this.store.dispatch(
          UpdateMultipleChoiceResults({
            payload: { results: { rightCount: resultCount.rightCount, wrongCount: resultCount.wrongCount + 1 } },
          }),
        ),
      );
  }
}

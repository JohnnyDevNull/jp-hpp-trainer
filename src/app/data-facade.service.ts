import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDataItem, IDataTag } from './data.interface';
import { LoadData, ReLoadData } from './state/actions';
import { AppState } from './state/reducers';
import { selectDataApiError, selectDataIsLoading, selectDataItems, selectDataTags } from './state/selectors';

@Injectable({ providedIn: 'root' })
export class DataFacadeService {
  dataTags$: Observable<IDataTag[]>;
  dataItems$: Observable<IDataItem[]>;
  dataIsLoading$: Observable<boolean>;
  dataApiError$: Observable<Error | null>;

  public constructor(private readonly store: Store<AppState>) {
    this.dataTags$ = this.store.select(selectDataTags);
    this.dataItems$ = this.store.select(selectDataItems);
    this.dataIsLoading$ = this.store.select(selectDataIsLoading);
    this.dataApiError$ = this.store.select(selectDataApiError);
  }

  public load(reload = false) {
    this.store.dispatch(reload ? ReLoadData() : LoadData());
  }
}

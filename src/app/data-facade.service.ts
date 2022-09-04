import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDataTag } from './data.interface';
import { LoadData, ReLoadData } from './state/actions';
import { IAppState } from './state/reducers';
import { selectDataApiError, selectDataIsLoading, selectDataTags } from './state/selectors';

@Injectable({ providedIn: 'root' })
export class DataFacadeService {
  dataTags$: Observable<IDataTag[]>;
  dataIsLoading$: Observable<boolean>;
  dataApiError$: Observable<Error | null>;

  public constructor(private readonly store: Store<IAppState>) {
    this.dataTags$ = this.store.select(selectDataTags);
    this.dataIsLoading$ = this.store.select(selectDataIsLoading);
    this.dataApiError$ = this.store.select(selectDataApiError);
  }

  public load(reload = false) {
    this.store.dispatch(reload ? ReLoadData() : LoadData());
  }
}

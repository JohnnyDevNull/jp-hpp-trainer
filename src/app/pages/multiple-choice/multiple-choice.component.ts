import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IMultipleChoiceDataItem } from '../../data.interface';
import { IResultsCounter } from '../../state/reducers';
import { MultipleChoiceFacadeService } from './multiple-choice-facade.service';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleChoiceComponent {
  item$: Observable<IMultipleChoiceDataItem> = this.dataFacade.multipleChoiceActualIndex$.pipe(
    switchMap(actualIndex => this.dataFacade.getMultipleChoiceByIndex(actualIndex)),
  );
  itemCount$: Observable<number> = this.dataFacade.multipleChoiceItemsCount$;
  results$: Observable<IResultsCounter> = this.dataFacade.multipleChoiceResults$;

  isFlipped = true;
  isResultChosen = true;

  public constructor(private readonly dataFacade: MultipleChoiceFacadeService) {}
}

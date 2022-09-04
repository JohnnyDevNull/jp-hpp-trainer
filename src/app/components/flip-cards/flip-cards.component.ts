import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable, skip, switchMap, withLatestFrom } from 'rxjs';
import { DataFacadeService } from '../../data-facade.service';
import { IFlipCardDataItem } from '../../data.interface';
import { IResultsCounter } from '../../state/reducers';

@Component({
  selector: 'app-flip-cards',
  templateUrl: './flip-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCardsComponent {
  item$: Observable<IFlipCardDataItem | null> = this.dataFacade.flipCardActualIndex$.pipe(
    switchMap(actualIndex => this.dataFacade.getFlipCardByIndex(actualIndex)),
  );
  itemCount$: Observable<number> = this.dataFacade.flipCardItemsCount$;
  results$: Observable<IResultsCounter> = this.dataFacade.flipCardResults$;
  actualCardNumber$: Observable<number> = this.dataFacade.flipCardActualIndex$.pipe(map(index => index + 1));
  isPrevButtonDisabled$: Observable<boolean> = this.actualCardNumber$.pipe(map(n => n <= 1));
  isNextButtonDisabled$: Observable<boolean> = this.actualCardNumber$.pipe(
    skip(1),
    withLatestFrom(this.itemCount$),
    map(([actualNumber, itemCount]) => actualNumber >= itemCount),
  );
  isFlipped = false;
  isResultChosen = false;

  public constructor(public readonly dataFacade: DataFacadeService) {}

  public onPrev(): void {
    if (this.isResultChosen || !this.isFlipped) {
      this.isFlipped = false;
      this.isResultChosen = false;
      this.dataFacade.prevFlipCard();
    }
  }

  public onNext(): void {
    if (this.isResultChosen || !this.isFlipped) {
      this.isFlipped = false;
      this.isResultChosen = false;
      this.dataFacade.nextFlipCard();
    }
  }

  public onResult(isTrue: boolean): void {
    this.isResultChosen = true;
    isTrue ? this.dataFacade.incFlipCardRightCount() : this.dataFacade.incFlipCardWrongCount();
  }
}

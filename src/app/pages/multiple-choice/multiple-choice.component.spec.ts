import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { IMultipleChoiceDataItem } from '../../data.interface';
import { IResultsCounter } from '../../state/reducers';
import { MultipleChoiceFacadeService } from './multiple-choice-facade.service';
import { MultipleChoiceComponent } from './multiple-choice.component';

const multipleChoiceItemsMock$ = new BehaviorSubject<IMultipleChoiceDataItem[]>([]);
const multipleChoiceItemsCount$ = new BehaviorSubject<number>(0);
const multipleChoiceActualIndex$ = new BehaviorSubject<number>(0);
const multipleChoiceResults$ = new BehaviorSubject<IResultsCounter>({ rightCount: 0, wrongCount: 0 });

export class MultipleChoiceFacadeServiceMock {
  multipleChoiceItems$: Observable<IMultipleChoiceDataItem[]> = multipleChoiceItemsMock$.asObservable();
  multipleChoiceItemsCount$: Observable<number> = multipleChoiceItemsCount$.asObservable();
  multipleChoiceActualIndex$: Observable<number> = multipleChoiceActualIndex$.asObservable();
  multipleChoiceResults$: Observable<IResultsCounter> = multipleChoiceResults$.asObservable();
  getMultipleChoiceByIndex(index: number) {
    return this.multipleChoiceItems$.pipe(switchMap(items => of(items[index] || null)));
  }
  prevMultipleChoice() {
    multipleChoiceActualIndex$.next(multipleChoiceActualIndex$.value - 1);
  }
  nextMultipleChoice() {
    multipleChoiceActualIndex$.next(multipleChoiceActualIndex$.value + 1);
  }
  incMultipleChoiceRightCount() {}
  incMultipleChoiceWrongCount() {}
}

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleChoiceComponent],
      providers: [{ provide: MultipleChoiceFacadeService, useClass: MultipleChoiceFacadeServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

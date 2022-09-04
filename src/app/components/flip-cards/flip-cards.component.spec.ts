import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, switchMap } from 'rxjs';
import { DataFacadeService } from '../../data-facade.service';
import { IFlipCardDataItem } from '../../data.interface';

import { FlipCardsComponent } from './flip-cards.component';

class DataFacdeServiceMock {
  flipCardItems$: Observable<IFlipCardDataItem[]> = of([]);
  flipCardItemsCount$: Observable<number> = of(0);
  flipCardActualIndex$: Observable<number> = of(0);
  getFlipCardByIndex(index: number) {
    return this.flipCardItems$.pipe(switchMap(items => of(items[index] || null)));
  }
  prevFlipCard() {}
  nextFlipCard() {}
}

describe('FlipCardsComponent', () => {
  let component: FlipCardsComponent;
  let fixture: ComponentFixture<FlipCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlipCardsComponent],
      providers: [{ provide: DataFacadeService, useClass: DataFacdeServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FlipCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

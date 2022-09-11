import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { IFlipCardDataItem } from '../../data.interface';
import { FlipCardsFacadeService } from './flip-cards-facade.service';

import { FlipCardsComponent } from './flip-cards.component';

const flipCardItemsMock$ = new BehaviorSubject([]);
const flipCardItemsCount$ = new BehaviorSubject(0);
const flipCardActualIndex$ = new BehaviorSubject(0);

class FlipCardsFacadeServiceMock {
  flipCardItems$: Observable<IFlipCardDataItem[]> = flipCardItemsMock$.asObservable();
  flipCardItemsCount$: Observable<number> = flipCardItemsCount$.asObservable();
  flipCardActualIndex$: Observable<number> = flipCardActualIndex$.asObservable();
  getFlipCardByIndex(index: number) {
    return this.flipCardItems$.pipe(switchMap(items => of(items[index] || null)));
  }
  prevFlipCard() {
    flipCardActualIndex$.next(flipCardActualIndex$.value - 1);
  }
  nextFlipCard() {
    flipCardActualIndex$.next(flipCardActualIndex$.value + 1);
  }
  incFlipCardRightCount() {}
  incFlipCardWrongCount() {}
}

describe('FlipCardsComponent', () => {
  let component: FlipCardsComponent;
  let fixture: ComponentFixture<FlipCardsComponent>;
  let service: FlipCardsFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlipCardsComponent],
      providers: [{ provide: FlipCardsFacadeService, useClass: FlipCardsFacadeServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FlipCardsComponent);
    service = TestBed.inject(FlipCardsFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should flip', () => {
    expect(component.isFlipped).toBe(false);
    const button = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-flip"]');
    button.click();
    expect(component.isFlipped).toBe(true);
    button.click();
    expect(component.isFlipped).toBe(false);
  });

  it('prev btn should be disabled', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-prev"]');
    expect(button.disabled).toBe(true);
  });

  it('prev btn should be enabled', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-prev"]');
    expect(button.disabled).toBe(false);
  });

  it('prevFlipCard should be called if not flipped and chosen', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    jest.spyOn(service, 'prevFlipCard');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-prev"]');
    button.click();
    fixture.detectChanges();
    expect(service.prevFlipCard).toHaveBeenCalled();
    const pagerInfo = fixture.debugElement.nativeElement.querySelector('div[data-spec="pager-info"]');
    expect(pagerInfo.innerHTML).toBe(' 2 von 4 ');
  });

  it('prevFlipCard should only be called if flipped and yes chosen', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    jest.spyOn(service, 'prevFlipCard');
    const buttonFlip = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-flip"]');
    buttonFlip.click();
    fixture.detectChanges();

    const btnNext = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-prev"]');
    expect(btnNext.disable).toBeFalsy();
    btnNext.click();
    fixture.detectChanges();
    expect(service.prevFlipCard).not.toHaveBeenCalled();

    const btnYes = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-result-yes"]');
    btnYes.click();
    fixture.detectChanges();
    btnNext.click();
    fixture.detectChanges();
    expect(service.prevFlipCard).toHaveBeenCalled();
  });

  it('prevFlipCard should only be called if flipped and no chosen', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    jest.spyOn(service, 'prevFlipCard');
    const buttonFlip = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-flip"]');
    buttonFlip.click();
    fixture.detectChanges();

    const btnNext = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-prev"]');
    expect(btnNext.disable).toBeFalsy();
    btnNext.click();
    fixture.detectChanges();
    expect(service.prevFlipCard).not.toHaveBeenCalled();

    const btnNo = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-result-no"]');
    btnNo.click();
    fixture.detectChanges();
    btnNext.click();
    fixture.detectChanges();
    expect(service.prevFlipCard).toHaveBeenCalled();
  });

  it('next btn should be disabled', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(4);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-next"]');
    expect(button.disabled).toBe(true);
  });

  it('next btn should be enabled', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-next"]');
    expect(button.disabled).toBe(false);
  });

  it('nextFlipCard should be called if not flipped and chosen', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    jest.spyOn(service, 'nextFlipCard');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-next"]');
    button.click();
    fixture.detectChanges();
    expect(service.nextFlipCard).toHaveBeenCalled();
    const pagerInfo = fixture.debugElement.nativeElement.querySelector('div[data-spec="pager-info"]');
    expect(pagerInfo.innerHTML).toBe(' 4 von 4 ');
  });

  it('nextFlipCard should only be called if flipped and yes chosen', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    jest.spyOn(service, 'nextFlipCard');
    const buttonFlip = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-flip"]');
    buttonFlip.click();
    fixture.detectChanges();

    const btnNext = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-next"]');
    expect(btnNext.disable).toBeFalsy();
    btnNext.click();
    fixture.detectChanges();
    expect(service.nextFlipCard).not.toHaveBeenCalled();

    const btnYes = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-result-yes"]');
    btnYes.click();
    fixture.detectChanges();
    btnNext.click();
    fixture.detectChanges();
    expect(service.nextFlipCard).toHaveBeenCalled();
  });

  it('nextFlipCard should only be called if flipped and no chosen', () => {
    flipCardItemsCount$.next(4);
    flipCardActualIndex$.next(2);
    jest.spyOn(service, 'nextFlipCard');
    const buttonFlip = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-flip"]');
    buttonFlip.click();
    fixture.detectChanges();

    const btnNext = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-next"]');
    expect(btnNext.disable).toBeFalsy();
    btnNext.click();
    fixture.detectChanges();
    expect(service.nextFlipCard).not.toHaveBeenCalled();

    const btnNo = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-result-no"]');
    btnNo.click();
    fixture.detectChanges();
    btnNext.click();
    fixture.detectChanges();
    expect(service.nextFlipCard).toHaveBeenCalled();
  });

  it('incFlipCardWrongCount should be called if flipped and no chosen', () => {
    flipCardItemsCount$.next(1);
    flipCardActualIndex$.next(1);
    jest.spyOn(service, 'incFlipCardRightCount');
    jest.spyOn(service, 'incFlipCardWrongCount');
    const buttonFlip = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-flip"]');
    buttonFlip.click();
    fixture.detectChanges();

    const btnNo = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-result-no"]');
    btnNo.click();
    fixture.detectChanges();

    expect(service.incFlipCardRightCount).not.toHaveBeenCalled();
    expect(service.incFlipCardWrongCount).toHaveBeenCalled();
  });

  it('incFlipCardRightCount should be called if flipped and no chosen', () => {
    flipCardItemsCount$.next(1);
    flipCardActualIndex$.next(1);
    jest.spyOn(service, 'incFlipCardRightCount');
    jest.spyOn(service, 'incFlipCardWrongCount');
    const buttonFlip = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-flip"]');
    buttonFlip.click();
    fixture.detectChanges();

    const btnYes = fixture.debugElement.nativeElement.querySelector('button[data-spec="btn-result-yes"]');
    btnYes.click();
    fixture.detectChanges();

    expect(service.incFlipCardRightCount).toHaveBeenCalled();
    expect(service.incFlipCardWrongCount).not.toHaveBeenCalled();
  });
});

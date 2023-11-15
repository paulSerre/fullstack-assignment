import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPickerModalComponent } from './currency-picker-modal.component';

describe('CurrencyPickerModalComponent', () => {
  let component: CurrencyPickerModalComponent;
  let fixture: ComponentFixture<CurrencyPickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyPickerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyPickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

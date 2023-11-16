import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CurrencyService } from '../../services/currency.service';
import { Subscription, find, tap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-picker-modal',
  templateUrl: './currency-picker-modal.component.html',
  styleUrls: ['./currency-picker-modal.component.scss'],
})
export class CurrencyPickerModalComponent implements OnInit, OnDestroy {

  selectedCurrency = new FormControl(null, {
    validators: Validators.required,
  });
  subscription: Subscription
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public currenciesList: string[],
    public dialogRef: MatDialogRef<CurrencyPickerModalComponent>,
    private readonly currencyService: CurrencyService,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.subscription = this.currencyService.currenciesSubject
      .pipe(
        tap({
          next: (currencies) => {
            if (currencies.some(({ _code }) => _code === this.selectedCurrency.value)) {
              this.loading = false;
              this.selectedCurrency.reset()
              this.onNoClick()
            }
          },
          error: (error) => this.loading = false,
        })
      ).subscribe()
  }


  onSubscribeCurrency() {
    this.loading = true;
    this.currencyService.subscribeToCurrency(this.selectedCurrency.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

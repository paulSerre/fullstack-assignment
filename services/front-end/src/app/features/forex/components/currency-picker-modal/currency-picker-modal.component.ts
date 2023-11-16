import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CurrencyService } from '../../services/currency.service';
import { Subscription, find } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-currency-picker-modal',
  templateUrl: './currency-picker-modal.component.html',
  styleUrls: ['./currency-picker-modal.component.scss'],
})
export class CurrencyPickerModalComponent implements OnInit, OnDestroy {

  selectedCurrency = new FormControl('');
  subscription: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public currenciesList: string[],
    public dialogRef: MatDialogRef<CurrencyPickerModalComponent>,
    private readonly currencyService: CurrencyService,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.subscription = this.currencyService.currenciesSubject.subscribe({
      next: (currencies) => {
        if (currencies.some(({ _code }) => _code === this.selectedCurrency.value)) this.onNoClick()
      },
    })
  }


  onSubscribeCurrency() {
    this.currencyService.subscribeToCurrency(this.selectedCurrency.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

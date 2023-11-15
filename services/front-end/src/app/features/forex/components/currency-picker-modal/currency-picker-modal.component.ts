import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CurrencyService } from '../../services/currency.service';
import { Subscription, map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { currencyCodes } from 'src/app/common/constants/Constants';

@Component({
  selector: 'app-currency-picker-modal',
  templateUrl: './currency-picker-modal.component.html',
  styleUrls: ['./currency-picker-modal.component.scss'],
})
export class CurrencyPickerModalComponent {

  selectedCurrency = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public currenciesList: string[],
    public dialogRef: MatDialogRef<CurrencyPickerModalComponent>,
    private readonly currencyService: CurrencyService,
  ) {}


  onSubscribeCurrency() {
    this.currencyService.subscribeToCurrency(this.selectedCurrency.value);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

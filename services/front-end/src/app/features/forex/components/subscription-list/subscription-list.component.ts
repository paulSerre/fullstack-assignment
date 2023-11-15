import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { CurrencyService } from 'src/app/features/forex/services/currency.service';
import { CurrencyHistory } from 'src/app/models/currency-history';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyPickerModalComponent } from '../currency-picker-modal/currency-picker-modal.component';
import { currencyCodes } from 'src/app/common/constants/Constants';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  currencies: Currency[] = [];

  constructor(
    private currencyService: CurrencyService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.subscription = this.currencyService.currenciesSubject.subscribe({
      next: (value) => this.currencies = value,
      error: console.error,
      complete: console.info,
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  unsubscribeTo(currencyCode: string) {
    this.currencyService.unsubscribeToCurrency(currencyCode);
  }

  openDialog(): void {
    const subscribedCurencyCode = this.currencies.map(({ _code }) => _code);
    this.dialog.open(CurrencyPickerModalComponent, {
      data: currencyCodes.filter((code) => !subscribedCurencyCode.includes(code)),
    });
  }

  getFormattedDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Formats date as 'YYYY-MM-DD'
  }

  getMostRecentDates(history: Record<string, CurrencyHistory>) {
    // Convert object keys to an array and sort in descending order
    const sortedDates = Object.keys(history).sort((a, b) => b.localeCompare(a));

    // Get the most recent and second most recent dates
    const mostRecentDate = sortedDates[0];
    const secondMostRecentDate = sortedDates[1];

    return { mostRecentDate, secondMostRecentDate };
  }

  getTodayHistory(currency: Currency) {
    const { mostRecentDate } = this.getMostRecentDates(currency._history);
    return currency._history[mostRecentDate];
  }

  getYesterdayHistory(currency: Currency) {
    const { secondMostRecentDate } = this.getMostRecentDates(currency._history);
    return currency._history[secondMostRecentDate];
  }
}

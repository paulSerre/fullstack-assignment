import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Currency } from '../../../models/currency';
import { Subject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private url:string = environment.apiUrl;
  private currencies: Currency[] = [];
  currenciesSubject = new Subject<Currency[]>()

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.getSubscribedCurrencies({ history: true });
  }

  getSubscribedCurrencies(params: { history: boolean }) {
    this.httpClient
      .get<{data: Currency[] }>(
        `${this.url}/currencies`,
        { params }
      )
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (res) => {
          this.currencies = res.data;
          this.emitCurrency();
        },
        error: (err) => this.currenciesSubject.error(err),
      })
  }

  emitCurrency() {
    this.currenciesSubject.next(this.currencies.slice());
  }

  subscribeToCurrency(currencyCode: string) {
    this.httpClient.post(`${this.url}/currency`, {
      code: currencyCode,
    })
    .pipe(catchError(this.handleError.bind(this)))
    .subscribe({
      next: (res: { data: Currency }) => {
        this.currencies.push(res.data);
        this.emitCurrency();
      },
      error: (err) => this.currenciesSubject.error(err),
    })
  }

  unsubscribeToCurrency(currencyCode: string) {
    this.httpClient.put(`${this.url}/currency/${currencyCode}`, {})
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (res: { data: Currency }) => {
          const elementPos = this.currencies.findIndex((currency) => currency._code === res.data._code);
          this.currencies.splice(elementPos, 1);
          this.emitCurrency();
        },
        error: (err) => this.currenciesSubject.error(err),
      });
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    // You can customize the error message based on the error object
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error?.error?.data) errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.data}`;
      else errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000,
    });
    return throwError(errorMessage);
  }
}

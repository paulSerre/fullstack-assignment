import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../../../models/currency';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private url:string = environment.apiUrl;
  private currencies: Currency[] = [];
  currenciesSubject = new Subject<Currency[]>()

  constructor(private httpClient: HttpClient) {
    this.getSubscribedCurrencies({ history: true });
  }

  getSubscribedCurrencies(params: { history: boolean }) {
    this.httpClient
      .get<{data: Currency[] }>(
        `${this.url}/currencies`,
        { params }
      )
      .subscribe(
        (res) => {
          this.currencies = res.data;
          this.emitCurrency();
        }
      )
  }

  emitCurrency() {
    this.currenciesSubject.next(this.currencies.slice());
  }

  subscribeToCurrency(currencyCode: string) {
    this.httpClient.post(`${this.url}/currency`, {
      code: currencyCode,
    }).subscribe((res: { data: Currency }) => {
      this.currencies.push(res.data);
      this.emitCurrency();
    })
  }

  unsubscribeToCurrency(currencyCode: string) {
    this.httpClient.put(`${this.url}/currency/${currencyCode}`, {})
      .subscribe((res: { data: Currency }) => {
        const elementPos = this.currencies.findIndex((currency) => currency._code === res.data._code);
        this.currencies.splice(elementPos, 1);
        this.emitCurrency();
      });
  }
}

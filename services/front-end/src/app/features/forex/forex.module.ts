import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForexLandingPageComponent } from './pages/forex-landing-page/forex-landing-page.component';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { routes } from './forex.routing';
import { SubscriptionListComponent } from 'src/app/features/forex/components/subscription-list/subscription-list.component';
import { CurrencyService } from './services/currency.service';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPickerModalComponent } from './components/currency-picker-modal/currency-picker-modal.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';


export const loader = ['en', 'es'].reduce((acc, lang) => {
  acc[lang] = () => import(`./i18n/forex.${lang}.json`);
  return acc;
}, {});

@NgModule({
  declarations: [
    ForexLandingPageComponent,
    SubscriptionListComponent,
    CurrencyPickerModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    CurrencyService,
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'forex',
        loader
      }
    }
  ],
})
export class ForexModule { }

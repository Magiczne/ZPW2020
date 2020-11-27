
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { TripComponent } from './components/trip/trip.component';
import { TripCreateComponent } from './components/trip-create/trip-create.component';
import { TripFiltersComponent } from './components/trip-filters/trip-filters.component';
import { TripRatingComponent } from './components/trip-rating/trip-rating.component';
import { TripShoppingCartComponent } from './components/trip-shopping-cart/trip-shopping-cart.component';

import { PageAuthComponent } from './pages/page-auth/page-auth.component';
import { PageShoppingCartComponent } from './pages/page-shopping-cart/page-shopping-cart.component';
import { PageShoppingConfirmComponent } from './pages/page-shopping-confirm/page-shopping-confirm.component';
import { PageTripsComponent } from './pages/page-trips/page-trips.component';
import { PageTripCreateComponent } from './pages/page-trip-create/page-trip-create.component';
import { PageTripPreviewComponent } from './pages/page-trip-preview/page-trip-preview.component';

import { FilterTripsPipe } from './pipes/filter-trips.pipe';
import { InMemoryDataService } from './services/in-memory-data.service';

import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TripComponent,
    TripCreateComponent,
    TripFiltersComponent,
    TripRatingComponent,
    TripShoppingCartComponent,
    FilterTripsPipe,

    PageAuthComponent,
    PageShoppingCartComponent,
    PageShoppingConfirmComponent,
    PageTripsComponent,
    PageTripCreateComponent,
    PageTripPreviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,

    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

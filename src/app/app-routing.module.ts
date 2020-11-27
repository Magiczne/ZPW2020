import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageAuthComponent } from './pages/page-auth/page-auth.component';
import { PageShoppingCartComponent } from './pages/page-shopping-cart/page-shopping-cart.component';
import { PageShoppingConfirmComponent } from './pages/page-shopping-confirm/page-shopping-confirm.component';
import { PageTripsComponent } from './pages/page-trips/page-trips.component';
import { PageTripCreateComponent } from './pages/page-trip-create/page-trip-create.component';
import { PageTripPreviewComponent } from './pages/page-trip-preview/page-trip-preview.component';

const routes: Routes = [
  { path: 'auth', component: PageAuthComponent },

  { path: '', component: PageTripsComponent },
  { path: 'trip/create', component: PageTripCreateComponent },
  { path: 'trip/preview/:id', component: PageTripPreviewComponent },

  { path: 'shopping-cart', component: PageShoppingCartComponent },
  { path: 'shopping-cart/confirm', component: PageShoppingConfirmComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

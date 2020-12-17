import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageAuthComponent } from './pages/page-auth/page-auth.component';
import { PageShoppingCartComponent } from './pages/page-shopping-cart/page-shopping-cart.component';
import { PageShoppingConfirmComponent } from './pages/page-shopping-confirm/page-shopping-confirm.component';
import { PageTripsComponent } from './pages/page-trips/page-trips.component';
import { PageTripPreviewComponent } from './pages/page-trip-preview/page-trip-preview.component';

import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageTripCreateComponent } from './pages/page-trip-create/page-trip-create.component';
import { PageTripEditComponent } from './pages/page-trip-edit/page-trip-edit.component';

import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: PageAuthComponent },

  { path: '', component: PageTripsComponent },
  { path: 'trip/preview/:id', component: PageTripPreviewComponent },

  { path: 'shopping-cart', component: PageShoppingCartComponent, canActivate: [ AuthGuard ] },
  { path: 'shopping-cart/confirm', component: PageShoppingConfirmComponent, canActivate: [ AuthGuard ] },

  { path: 'dashboard', component: PageDashboardComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: 'dashboard/trip/create', component: PageTripCreateComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: 'dashboard/trip/edit/:id', component: PageTripEditComponent, canActivate: [ AuthGuard, AdminGuard ] }
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

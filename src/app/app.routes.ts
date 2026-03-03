import { Routes } from '@angular/router';
import { CountryList } from './features/countries/pages/country-list/country-list';
import { CountryDetail } from './features/countries/pages/country-detail/country-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  { path: 'countries', component: CountryList },
  { path: 'countries/:code', component: CountryDetail },
];

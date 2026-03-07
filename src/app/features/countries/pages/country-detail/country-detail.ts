import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { switchMap, of, map } from 'rxjs';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen p-8">
      <ng-container *ngIf="country$ | async as country; else loadingTpl">
        <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="grid md:grid-cols-2 gap-8 p-8">
            <div class="flex items-center justify-center">
              <img [src]="country.flag" class="rounded-xl shadow-lg max-h-64 object-cover" />
            </div>

            <div class="space-y-4">
              <h1 class="text-4xl font-bold text-gray-900">
                {{ country.name }}
              </h1>

              <p class="text-gray-500">
                {{ country.officialName }}
              </p>

              <div class="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div>
                  <p class="text-gray-400">Capital</p>
                  <p class="font-medium">{{ country.capital }}</p>
                </div>

                <div>
                  <p class="text-gray-400">Region</p>
                  <p class="font-medium">{{ country.region }} / {{ country.subregion }}</p>
                </div>

                <div>
                  <p class="text-gray-400">Population</p>
                  <p class="font-medium">
                    {{ country.population | number }}
                  </p>
                </div>

                <div>
                  <p class="text-gray-400">Area</p>
                  <p class="font-medium">{{ country.area | number }} km²</p>
                </div>

                <div>
                  <p class="text-gray-400">Languages</p>
                  <p class="font-medium">
                    {{ country.languages.join(', ') }}
                  </p>
                </div>

                <div>
                  <p class="text-gray-400">Currencies</p>
                  <p class="font-medium">
                    {{ country.currencies.join(', ') }}
                  </p>
                </div>
              </div>

              <a
                [href]="country.maps"
                target="_blank"
                class="inline-block mt-6 px-5 py-3 bg-primary text-white rounded-lg hover:bg-primaryDeep transition"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          <div *ngIf="borderCountries$ | async as borders" class="px-8 pb-8">
            <div *ngIf="borders.length > 0">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Border Countries</h3>

              <div class="flex flex-wrap gap-2">
                <button
                  *ngFor="let border of borders"
                  (click)="goToCountry(border.code)"
                  class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition hover:cursor-pointer"
                >
                  {{ border.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

      <ng-template #loadingTpl>
        <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-pulse">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="h-64 bg-gray-300 rounded-xl"></div>

            <div class="space-y-4">
              <div class="h-8 bg-gray-300 rounded w-1/2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>

              <div class="grid grid-cols-2 gap-4 mt-6">
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </ng-template>

      <div class="flex justify-center mt-5">
        <button
          (click)="goBack()"
          class="mb-8 px-4 py-2 bg-white/80 backdrop-blur rounded-lg shadow hover:bg-white transition"
        >
          ← Back
        </button>
      </div>
    </div>
  `,
})
export class CountryDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private countryService = inject(CountryService);
  private location = inject(Location);

  country$ = this.route.paramMap.pipe(
    map((params) => params.get('code')!),
    switchMap((code) => this.countryService.getCountryByCode(code)),
  );

  borderCountries$ = this.country$.pipe(
    switchMap((country: any) => {
      if (!country.borders?.length) return of([]);
      return this.countryService.getCountriesByCodes(country.borders);
    }),
  );

  goToCountry(code: string) {
    this.router.navigate(['/countries', code]);
  }

  goBack() {
    this.location.back();
  }
}

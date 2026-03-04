import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6">
      <ng-container *ngIf="country$ | async as country; else loadingTpl">
        <img [src]="country.flag" class="w-64 mb-4 rounded shadow" />

        <h2 class="text-3xl font-bold mb-2">
          {{ country.name }}
        </h2>

        <p><strong>Capital:</strong> {{ country.capital }}</p>
        <p><strong>Population:</strong> {{ country.population | number }}</p>
        <p><strong>Code:</strong> {{ country.code }}</p>
      </ng-container>
      <button
        (click)="goBack()"
        class="inline-block mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        ← Back to Countries
      </button>
      <ng-template #loadingTpl>
        <div class="text-gray-500">Loading country...</div>
      </ng-template>
    </div>
  `,
})
export class CountryDetail {
  private route = inject(ActivatedRoute);
  private countryService = inject(CountryService);
  private location = inject(Location);

  private code = this.route.snapshot.paramMap.get('code')!;

  country$ = this.countryService.getCountryByCode(this.code);

  goBack() {
    this.location.back();
  }
}

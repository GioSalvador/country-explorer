import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-country-card',
  standalone: true,
  template: `
    <div class="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div class="h-32 bg-gray-300"></div>

      <div class="p-4 space-y-2">
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  `,
})
export class SkeletonCountryCard {}

import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CountryCard } from '../../components/country-card/country-card';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, CountryCard],
  templateUrl: './country-list.html',
})
export class CountryList {
  private countryService = inject(CountryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pageSize = 9;

  private allCountries = signal<any[]>([]);

  currentPage = signal(1);

  totalPages = computed(() => Math.ceil(this.allCountries().length / this.pageSize));

  paginatedCountries = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allCountries().slice(start, end);
  });

  constructor() {
    this.countryService.getCountries().subscribe((data) => {
      this.allCountries.set(data);
    });

    this.route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1;
      this.currentPage.set(page);
    });

    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage() },
        queryParamsHandling: 'merge',
      });
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  goToFirstPage() {
    this.currentPage.set(1);
  }

  goToLastPage() {
    this.currentPage.set(this.totalPages());
  }
}

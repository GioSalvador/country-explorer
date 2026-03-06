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

  searchTerm = signal('');
  region = signal('');

  pageSize = 12;

  allCountries = signal<any[]>([]);
  currentPage = signal(1);

  filteredCountries = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const region = this.region();

    const filtered = this.allCountries().filter((country) => {
      const name = country.name.toLowerCase();

      const matchesSearch = !term || name.includes(term);
      const matchesRegion = !region || country.region === region;

      return matchesSearch && matchesRegion;
    });

    return filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      const aStarts = term && nameA.startsWith(term);
      const bStarts = term && nameB.startsWith(term);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return nameA.localeCompare(nameB);
    });
  });

  totalPages = computed(() => Math.ceil(this.filteredCountries().length / this.pageSize));

  paginatedCountries = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.filteredCountries().slice(start, end);
  });

  constructor() {
    this.countryService.getCountries().subscribe((data) => {
      this.allCountries.set(data);
    });

    this.route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1;
      const search = params.get('search') || '';
      const region = params.get('region') || '';

      this.currentPage.set(page);
      this.searchTerm.set(search);
      this.region.set(region);
    });

    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.currentPage(),
          search: this.searchTerm() || null,
          region: this.region() || null,
        },
        queryParamsHandling: 'merge',
      });
    });
  }

  updateSearch(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
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

  clearFilters() {
    this.searchTerm.set('');
    this.region.set('');
    this.currentPage.set(1);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}

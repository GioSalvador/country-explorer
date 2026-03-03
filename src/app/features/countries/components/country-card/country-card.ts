import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface CountryMock {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  code: string;
}

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-card.html',
  styleUrl: './country-card.css',
})
export class CountryCard {
  @Input() country!: CountryMock;

  constructor(private router: Router) {}

  navigateToDetail() {
    this.router.navigate(['/countries', this.country.code]);
  }
}

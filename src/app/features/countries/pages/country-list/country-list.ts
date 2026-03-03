import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryCard } from '../../components/country-card/country-card';

interface CountryMock {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  code: string;
}

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, CountryCard],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css',
})
export class CountryList {
  countries: CountryMock[] = [
    {
      name: 'Brazil',
      population: 214000000,
      region: 'Americas',
      capital: 'Brasília',
      flag: 'https://flagcdn.com/w320/br.png',
      code: 'BRA',
    },
    {
      name: 'Germany',
      population: 83000000,
      region: 'Europe',
      capital: 'Berlin',
      flag: 'https://flagcdn.com/w320/de.png',
      code: 'DEU',
    },
    {
      name: 'Japan',
      population: 125000000,
      region: 'Asia',
      capital: 'Tokyo',
      flag: 'https://flagcdn.com/w320/jp.png',
      code: 'JPN',
    },
  ];
}

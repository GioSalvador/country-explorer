import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Country } from '../../services/country.service';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country-card.html',
  styleUrl: './country-card.css',
})
export class CountryCard {
  @Input() country!: Country;
}

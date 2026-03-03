import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  imports: [RouterLink],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css',
})
export class CountryDetail {
  private route = inject(ActivatedRoute);

  countryName: string | null = null;

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('name');
  }
}

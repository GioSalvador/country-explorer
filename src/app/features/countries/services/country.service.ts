import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Country {
  name: string;
  capital: string;
  population: number;
  flag: string;
  code: string;
  region: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private API_URL =
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,cca3';
  getCountries(): Observable<Country[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map((response) => {
        if (!Array.isArray(response)) {
          console.error('API did not return array:', response);
          return [];
        }

        return response.map((country) => ({
          name: country?.name?.common ?? 'Unknown',
          capital: country?.capital?.[0] ?? 'No capital',
          population: country?.population ?? 0,
          flag: country?.flags?.png ?? '',
          code: country?.cca3 ?? '',
          region: country?.region ?? '',
        }));
      }),
    );
  }

  getCountryByCode(code: string) {
    return this.http.get<any[]>(`https://restcountries.com/v3.1/alpha/${code}`).pipe(
      map((response) => {
        const c = response[0];

        return {
          name: c.name?.common,
          officialName: c.name?.official,
          capital: c.capital?.[0] ?? 'No capital',
          population: c.population,
          flag: c.flags?.png,
          code: c.cca3,
          region: c.region,
          subregion: c.subregion,
          languages: Object.values(c.languages || {}),
          currencies: Object.values(c.currencies || {}).map((cur: any) => cur.name),
          area: c.area,
          timezones: c.timezones,
          maps: c.maps?.googleMaps,
        };
      }),
    );
  }
}

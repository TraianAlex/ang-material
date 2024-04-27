import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';
import { Observable, Subject, delay, mergeMap, of } from 'rxjs';

interface Weather {
  city: string;
  temperature: number;
  humidity: number;
}

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic34Component implements OnInit {
  displayWeather: Weather[] = [];
  citySubject$ = new Subject<string>();

  ngOnInit() {
    this.citySubject$
      .pipe(
        mergeMap((city) => {
          return this.getWeather(city).pipe(delay(1000));
        })
      )
      .subscribe((weather) => {
        this.displayWeather.push(weather);
      });
  }

  submitCity(city: string) {
    this.citySubject$.next(city);
  }

  getWeather(city: string): Observable<Weather> {
    const weatherDataMap: { [key: string]: Weather } = {
      seattle: {
        city: 'Seattle',
        temperature: 73,
        humidity: 41,
      },
      'new york city': {
        city: 'New York City',
        temperature: 73,
        humidity: 41,
      },
      'los angeles': {
        city: 'Los Angeles',
        temperature: 73,
        humidity: 41,
      },
    };

    return of(weatherDataMap[city]);
  }
}

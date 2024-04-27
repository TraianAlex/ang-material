import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, filter } from 'rxjs';
import { MaterialModule } from '../../../material.module';

interface Weather {
  day: string;
  temperature: number;
}

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic22Component {
  displayWeather: Weather[] = [];
  weatherSubject = new Subject<Weather>();

  private weatherData = [
    {
      day: 'Monday',
      temperature: 61,
    },
    {
      day: 'Tuesday',
      temperature: 72,
    },
    {
      day: 'Wednesday',
      temperature: 76,
    },
    {
      day: 'Thursday',
      temperature: 49,
    },
    {
      day: 'Friday',
      temperature: 53,
    },
    {
      day: 'Saturday',
      temperature: 62,
    },
    {
      day: 'Sunday',
      temperature: 77,
    },
  ];

  ngOnInit() {
    this.weatherSubject
      .pipe(
        filter((weather) => {
          return weather.temperature >= 77;
        })
      )
      .subscribe((weather) => {
        this.displayWeather.push(weather);
      });
  }

  getWeatherData() {
    for (const weather of this.weatherData) {
      this.weatherSubject.next(weather);
    }
  }
}

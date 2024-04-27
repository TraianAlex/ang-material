import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';
import { Subject, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Weather {
  day: string;
  temperature: number;
}
@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink, FormsModule],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic21Component {
  inputTemperature = 0;
  weatherOutput: Weather | undefined;
  weatherSubject$ = new Subject<Weather>();

  selectedDay = 'Monday';

  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  ngOnInit() {
    this.weatherSubject$
      .pipe(
        map((weather) => {
          return {
            temperature: Math.ceil(weather.temperature),
            day: weather.day,
          };
        })
      )
      .subscribe((weather) => {
        this.weatherOutput = weather;
      });
  }

  setTemperature() {
    this.weatherSubject$.next({
      temperature: this.inputTemperature,
      day: this.selectedDay,
    });
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = Number(input);
  }
}

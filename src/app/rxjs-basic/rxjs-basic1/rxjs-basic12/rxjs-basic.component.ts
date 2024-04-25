import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic12Component implements OnInit {
  inputTemperature = 0;
  originalTemperature = 0;
  temperatureSubject2$ = new Subject<number>();
  displayTemperatureText = '';
  isCelsius = false;
  isTouched = false;

  ngOnInit() {
    this.temperatureSubject2$.subscribe((temperature) => {
      if (this.isCelsius) {
        this.displayTemperatureText = temperature + '° C';
      } else {
        this.displayTemperatureText = temperature + '° F';
      }
      this.inputTemperature = temperature;
      this.isTouched = true;
    });
  }

  setTemperature() {
    this.originalTemperature = this.inputTemperature;
    this.isCelsius = false;
    this.temperatureSubject2$.next(this.originalTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  convertToCelsius() {
    this.isCelsius = true;
    const celsiusTemperature = ((this.inputTemperature - 32) * 5) / 9;
    this.temperatureSubject2$.next(celsiusTemperature);
  }

  convertToFahrenheit() {
    this.isCelsius = false;
    const celsiusTemperature = (this.inputTemperature * 9) / 5 + 32;
    this.temperatureSubject2$.next(celsiusTemperature);
  }
}

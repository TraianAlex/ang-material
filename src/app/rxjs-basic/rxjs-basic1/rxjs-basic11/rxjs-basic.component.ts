import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';

const SNOWMAN_IMAGE = '../assets/icons/snowman image.jpg';
const SUN_IMAGE = '../assets/icons/sun.jpg';

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic11Component implements OnInit {
  temperatureSubject1$ = new BehaviorSubject<number>(72);
  inputTemperature = 0;
  imageSrc = SUN_IMAGE;
  temperatureSubject2$ = new Subject<number>();
  displayTemperatureText = '';
  isCelsius = false;
  isTouched = false;
  temperatureDataList: number[] = [];
  temperatureSubject3$ = new ReplaySubject<number>();
  replaySubscription: Subscription | undefined;

  ngOnInit() {
    this.temperatureSubject1$.subscribe((temperature: number) => {
      if (temperature >= 40) {
        this.imageSrc = SUN_IMAGE;
      } else {
        this.imageSrc = SNOWMAN_IMAGE;
      }
    });
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
    this.temperatureSubject1$.next(this.inputTemperature);
    const temperature = this.inputTemperature;
    this.temperatureSubject2$.next(temperature);
    this.temperatureSubject3$.next(temperature);
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

  addSubscription() {
    if (this.replaySubscription) {
      return;
    }

    this.temperatureDataList = [];
    this.replaySubscription = this.temperatureSubject3$.subscribe((temperature) => {
      this.temperatureDataList.push(temperature);
    });
  }

  removeSubscription() {
    this.temperatureDataList = [];
    this.replaySubscription?.unsubscribe();
    this.replaySubscription = undefined;
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MaterialModule } from '../../../material.module';

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

  ngOnInit() {
    this.temperatureSubject1$.subscribe((temperature: number) => {
      if (temperature >= 40) {
        this.imageSrc = SUN_IMAGE;
      } else {
        this.imageSrc = SNOWMAN_IMAGE;
      }
    });
  }

  setTemperature() {
    this.temperatureSubject1$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }
}

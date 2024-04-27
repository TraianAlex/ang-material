import { Component } from '@angular/core';
import { Observable, from, last } from 'rxjs';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic24Component {
  temperatureSubject$ = new Observable<number>();
  temperatureDataList: number[] = [];
  temperatureInputList: number[] = [];
  inputTemperature = 0;

  setTemperature() {
    const temperature = this.inputTemperature;
    this.temperatureInputList.push(temperature);
  }

  displayValues() {
    this.temperatureSubject$ = from(this.temperatureInputList);
    this.temperatureSubject$.pipe(last()).subscribe((temperature) => {
      this.temperatureDataList.push(temperature);
    });
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }
}

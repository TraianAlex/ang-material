import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReplaySubject, Subscription } from 'rxjs';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic13Component implements OnInit {
  inputTemperature = 0;
  temperatureDataList: number[] = [];
  temperatureSubject3$ = new ReplaySubject<number>();
  replaySubscription: Subscription | undefined;

  ngOnInit() {}

  setTemperature() {
    const temperature = this.inputTemperature;
    this.temperatureSubject3$.next(temperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
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

import { Component } from '@angular/core';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    standalone: false
})
export class LineChartComponent {
  chart: any;
}

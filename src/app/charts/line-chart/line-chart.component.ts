import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40, 30],
        label: 'Approved Applications',
        fill: true,
        tension: 0.5,
        borderColor: '#2f3a8f',
        backgroundColor: '#3cba5f'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() {
  }

  ngOnInit() {
  }
}

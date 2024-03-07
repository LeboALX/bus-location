import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };
  public pieChartLabels = [ ['Pending'], ['Declined'], ['Approved']];
  public pieChartDatasets = [ {
    data: [ 40, 30, 50 ], 
    backgroundColor: ['orange', '#f00101', '#3cba5f']
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }
}

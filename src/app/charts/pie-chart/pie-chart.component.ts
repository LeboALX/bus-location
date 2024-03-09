import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input()data:number = 0
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
    data: [ [this.data], 30, 50 ], 
    backgroundColor: ['orange', '#f00101', '#3cba5f']
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }
}

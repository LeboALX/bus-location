import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };
  public pieChartLabels = [['Pending'], ['Declined'], ['Approved']];
  public pieChartDatasets: any;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private api: ApiService, private sharedService: SharedService) {
    this.refreshPie();
    this.sharedService.watchPieUpdates().subscribe((changes: any) => {
      this.refreshPie();
    })
  }

  ngOnInit(): void {
  }

  refreshPie(): void {
    this.api.genericGet('/get-company')
      .subscribe({
        next: (res: any) => {
          const pendingCount = res.filter((company: any) => company.status.toLowerCase() === 'pending').length
          const declinedCount = res.filter((company: any) => company.status.toLowerCase() === 'declined').length
          const approvedCount = res.filter((company: any) => company.status.toLowerCase() === 'approved').length

          this.pieChartDatasets = [{
            data: [pendingCount, declinedCount, approvedCount],
            backgroundColor: ['orange', '#f00101', '#3cba5f']
          }];
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
}

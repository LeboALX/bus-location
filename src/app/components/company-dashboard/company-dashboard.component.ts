import { Component } from '@angular/core';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {
  navItems: string[] = ['Home', 'Add Bus', 'Add Driver', 'Add Route']
  showHomeContent: boolean = true;
  showVehicleForm: boolean = false;
  showDriverForm: boolean = false;
  showTripForm: boolean = false;
  selectedNav: any = 0;

  changeContentDisplay(indx: any): void {
    // Set all other views false except indx content
    this.hideContentExcl(indx)
  }

  hideContentExcl(indx: any): void {
    this.selectedNav = indx;
    if (indx === 0) {
      this.showHomeContent = true;
      this.showVehicleForm = false;
      this.showDriverForm = false;
      this.showTripForm = false;
    } else if(indx === 1) {
      this.showHomeContent = false;
      this.showVehicleForm = true;
      this.showDriverForm = false;
      this.showTripForm = false;
    } else if(indx === 2) {
      this.showHomeContent = false;
      this.showVehicleForm = false;
      this.showDriverForm = true;
      this.showTripForm = false;
    }else if(indx === 3) {
      this.showHomeContent = false;
      this.showVehicleForm = false;
      this.showDriverForm = false;
      this.showTripForm = true;
    }
  }
}

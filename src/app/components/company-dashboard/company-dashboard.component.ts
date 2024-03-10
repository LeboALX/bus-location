import { Component, EventEmitter, Output,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddBusesComponent } from 'src/app/popups/add-buses/add-buses.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent{
  displayedColumns: string[] = ['make','model','numberPlate','ocupants','discNumber','busNumber'];
  displayedColumns1: string[] = ['name','surname','idNumber','licenseNumber','email','cellNumber','experience'];
  displayedColumns2: string[] = ['origin','stops','tripNumber','destination'];
  dataSource:any = new MatTableDataSource<any>();
  dataSource1:any = new MatTableDataSource<any>();
  dataSource2:any = new MatTableDataSource<any>();

  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  navItems: string[] = ['Home', 'Add Bus', 'Add Driver', 'Add Route']
  showHomeContent: boolean = true;
  showVehicleForm: boolean = false;
  showDriverForm: boolean = false;
  showTripForm: boolean = false;
  selectedNav: any = 0;

  constructor(private dialog: MatDialog, private api: ApiService){ 
    this.api.genericGet('/get-bus')
      .subscribe({
        next: (res: any) => {
          this.dataSource = res;
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });

      this.api.genericGet('/get-driver')
      .subscribe({
        next: (res: any) => {
          this.dataSource1 = res;
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });

      this.api.genericGet('/get-route')
      .subscribe({
        next: (res: any) => {
          this.dataSource2 = res;
          console.log(this.dataSource2)
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }



 

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

  openBus(){
    this.dialog.open(AddBusesComponent)
  }
  
}

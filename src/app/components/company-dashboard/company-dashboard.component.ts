import { Component, EventEmitter, Output, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddBusesComponent } from 'src/app/popups/add-buses/add-buses.component';
import { AddRouteComponent } from 'src/app/popups/add-route/add-route.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {
  navItems: string[] = ['Home', 'Add Bus', 'Add Driver', 'Add Trip'];
  displayedColumns: string[] = ['make', 'model', 'numberPlate', 'ocupants', 'discNumber', 'busNumber', 'actions'];
  displayedColumns1: string[] = ['name', 'surname', 'idNumber', 'licenseNumber', 'email', 'cellNumber', 'experience', 'actions'];
  displayedColumns2: string[] = ['origin', 'stops', 'tripNumber', 'destination', 'actions'];
  dataSource: any = new MatTableDataSource<any>();
  dataSource1: any = new MatTableDataSource<any>();
  dataSource2: any = new MatTableDataSource<any>();

  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue",filterValue)
    console.log(this.dataSource[0].make.substr(0,filterValue.trim().toLowerCase()))
    this.dataSource = this.dataSource.filter((item: any) => 
    item.make.substr(0,filterValue.trim().toLowerCase().length - 1) === filterValue.trim().toLowerCase());
  }
  showHomeContent: boolean = true;
  showVehicleForm: boolean = false;
  showDriverForm: boolean = false;
  showTripForm: boolean = false;
  selectedNav: any = 0;

  constructor(private dialog: MatDialog, private api: ApiService, private snackbar: MatSnackBar) {
    this.populateTabsTables();
  }

  populateTabsTables(): void {
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
    } else if (indx === 1) {
      this.showHomeContent = false;
      this.showVehicleForm = true;
      this.showDriverForm = false;
      this.showTripForm = false;
    } else if (indx === 2) {
      this.showHomeContent = false;
      this.showVehicleForm = false;
      this.showDriverForm = true;
      this.showTripForm = false;
    } else if (indx === 3) {
      this.showHomeContent = false;
      this.showVehicleForm = false;
      this.showDriverForm = false;
      this.showTripForm = true;
    }
  }

  openBus() {
    this.dialog.open(AddBusesComponent)
  }

  editRoutes(route: any) {
    console.log("Routes", route)
    this.dialog.open(AddRouteComponent, {
      data: {
        _data: route
      },
      width: '50%'
    });
  }
  delete(key: string, item: any): void {
    if (key === 'bus') {
      this.api.genericDelete(`/delete-bus/${item.busNumber}`)
        .subscribe({
          next: (res: any) => {
            if (res.deletedCount === 1) {
              this.snackbar.open('Successfully deleted bus', 'Ok', { duration: 3000 });
              this.populateTabsTables();
            } else {
              this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
            }
          },
          error: (err: any) => console.log('Error', err),
          complete: () => { }
        });
    } else if (key === 'driver') {
      this.api.genericDelete(`/delete-driver/${item.idNumber}`)
        .subscribe({
          next: (res: any) => {
            if (res.deletedCount === 1) {
              this.snackbar.open('Successfully deleted driver', 'Ok', { duration: 3000 });
              this.populateTabsTables();
            } else {
              this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
            }
          },
          error: (err: any) => console.log('Error', err),
          complete: () => { }
        });
    } else {
      this.api.genericDelete(`/delete-trip/${item.tripNumber}`)
        .subscribe({
          next: (res: any) => {
            if (res.deletedCount === 1) {
              this.snackbar.open('Successfully deleted trip', 'Ok', { duration: 3000 });
              this.populateTabsTables();
            } else {
              this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
            }
          },
          error: (err: any) => console.log('Error', err),
          complete: () => { }
        });
    }
  }
}

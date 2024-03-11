import { DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionTabComponent } from 'src/app/popups/action-tab/action-tab.component';
import { RegisterComponent } from 'src/app/popups/register/register.component';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent {
  displayedColumns: string[] = ['id', 'companyName', 'email', 'action', 'options'];
  applicationOptions: string[] = ['Approve', 'Declined'];
  pendingCount: number = 0;
  declinedCount: number = 0;
  approvedCount: number = 0;
  pieData: any;
  dataSource = new MatTableDataSource<any>();

  @Output() updatePieData: EventEmitter<any> = new EventEmitter<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private api: ApiService, private dialog: MatDialog,
     private snackbar: MatSnackBar, private sharedService: SharedService,) {
    this.refreshAdminPage()
  }

  refreshAdminPage(): void {
    this.api.genericGet('/get-company')
      .subscribe({
        next: (res: any) => {
          console.log("res", res)
          this.dataSource = res;
          this.pendingCount = res.filter((company: any) => company.status.toLowerCase() === 'pending').length
          this.declinedCount = res.filter((company: any) => company.status.toLowerCase() === 'declined').length
          this.approvedCount = res.filter((company: any) => company.status.toLowerCase() === 'approved').length
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  viewCompanyDetails(_data: any) {
    this.dialog.open(RegisterComponent,{
      data:_data
    })
   
  }

  deleteCompany(company: any): void {4
    this.api.genericDelete(`/delete-company/${company.companyRegistrationNumber}`)
      .subscribe({
        next: (res: any) => {
          if(res.deletedCount === 1){
            this.snackbar.open('Successfully deleted company','Ok',{duration: 3000});
            this.refreshAdminPage();
            this.sharedService.refreshPie();
          }else {
            this.snackbar.open('Something went wrong ...','Ok',{duration: 3000});
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  updateStatus(company: any, status: any) {
    let updateStatusTo;
    switch (status.toLowerCase()) {
      case 'approve':
        updateStatusTo = 'approved';
        break;
      default:
        updateStatusTo = 'declined';
        break;
    }
    this.api.genericPost(`/update-company/${company.companyRegistrationNumber}`, { status: updateStatusTo })
      .subscribe({
        next: (res: any) => {
          if(res.modifiedCount === 1){
            this.snackbar.open('Status updated','Ok',{duration: 3000});
            this.refreshAdminPage();
            this.sharedService.refreshPie();
          }else {
            this.snackbar.open('Something went wrong ...','Ok',{duration: 3000});
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
}

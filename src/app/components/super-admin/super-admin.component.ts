import { DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionTabComponent } from 'src/app/popups/action-tab/action-tab.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent {
  displayedColumns: string[] = ['id', 'companyName', 'action'];
  dataSource = new MatTableDataSource<any>();

  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private api: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    const data = this.api.genericGet('/get-company')
      .subscribe({
        next: (res: any) => {
        const item = res;
          this.dataSource.data = [item];
          console.log(this.dataSource.data.length)

        // chart display:
        this.data.emit(this.dataSource.data.length)

        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  action(company: any): void {
    this.dialog.open(ActionTabComponent);
    console.log(company)
    const dialogRef = this.dialog.open(ActionTabComponent, {
      data: company
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.snackbar.open('Action was canceled', 'Ok', { duration: 2000 })
      } else {
        this.snackbar.open(result, 'Ok', { duration: 2000 })
      }
    });
  }

  deleteCompany(): void{
    
  }
}

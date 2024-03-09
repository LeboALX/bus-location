import { DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private api: ApiService) {
    const data = this.api.genericGet('/get-company')
      .subscribe({
        next: (res: any) => {
          // this.dataSource = res;
        //   this.dataSource = {
        //     "_id": "65eb0b58af8038a6dfc29d97",
        //     "companyName": "Test",
        //     "status": "pending",
        //     "fileId": "picture-1709902649989",
        //     "companyRegistrationNumber": 12345645646,
        //     "address": {
        //         "streetName": "mamalangoane street",
        //         "streetNumber": 557,
        //         "city": "Emndeni",
        //         "code": 4564,
        //         "_id": "65eb0b58af8038a6dfc29d98"
        //     },
        //     "email": "mathotolebogang@gmail.com",
        //     "cellNumber": 1234567899
        // }
        
        // console.log("this.dataSource",this.dataSource)

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
}

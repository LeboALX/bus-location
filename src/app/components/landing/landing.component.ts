import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/popups/login/login.component';
import { RegisterComponent } from 'src/app/popups/register/register.component';
import { TrackerComponent } from '../tracker/tracker.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { AboutComponent } from '../about/about.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {


  @Output() searchShift: EventEmitter<any> = new EventEmitter();


  dialogItems: string[] = ['Driver', 'Admin'];
  currentValue: string = '';
  data: any
  tableData: any[] = []

  onInput(event: any) {
    this.currentValue = event.target.value;
  }

  searchBus!: FormGroup;
  panelColor = new FormControl;

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private api: ApiService) {
    this.searchBus = new FormGroup({
      tripNumber: new FormControl('', [Validators.required, Validators.maxLength(6)])
    })
    this.api.genericGet('/get-route')
      .subscribe({
        next: (res: any) => {
          this.data = res;
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  login(indx: any): void {
    if (indx === 0) {
      this.dialog.open(LoginComponent, {
        data: {
          _data: 'Admin'
        }
      })
    }
    if (indx === 1) {
      this.dialog.open(LoginComponent, {
        data: {
          _data: 'Driver'
        }
      })
    }
  }

  register() {
    this.dialog.open(RegisterComponent)
  }

  searchOnMap(): void {
    const matchingTrip = this.data.find((trip: any) => trip.tripNumber === this.searchBus.value.tripNumber);
    if (matchingTrip) {
      this.dialog.open(TrackerComponent, {
        data: {
          tripNo: matchingTrip
        }
      })
    } else {
      this.snackbar.open('Invalid bus trip number', 'Ok', { duration: 3000 });
      return;
    }
  }

  openFacebook(): void {
    window.open('https://www.facebook.com/', '_blank');
  }

  about():void{
    this.dialog.open(AboutComponent,{
      width:'60%',
      height:'70%',
    })
  }
}

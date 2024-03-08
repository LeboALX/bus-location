import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/popups/login/login.component';
import { RegisterComponent } from 'src/app/popups/register/register.component';
import { TrackerComponent } from '../tracker/tracker.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {


  @Output() searchShift: EventEmitter<any> = new EventEmitter();


  dialogItems: string[] = ['Driver', 'Admin'];
  currentValue: string = '';

  onInput(event: any) {
    this.currentValue = event.target.value;
  }

  searchBus!: FormGroup;
  panelColor = new FormControl;

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.searchBus = new FormGroup({
      tripNumber: new FormControl('', [Validators.required, Validators.maxLength(6)])
    })
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
    console.log("this.searchBus.value.tripNumber", this.searchBus.value.tripNumber)
    if (this.searchBus.value.tripNumber == '0001' || this.searchBus.value.tripNumber == '0002' || this.searchBus.value.tripNumber == '0003') {
      this.dialog.open(TrackerComponent, {
        data: {
          tripNo: this.searchBus.value.tripNumber
        }
      })
    } else {
      this.snackbar.open('Invalid bus trip number', 'Ok', { duration: 3000 });
      return;
    }
  }
}

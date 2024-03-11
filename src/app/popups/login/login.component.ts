import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  driver: boolean = false;
  logInForm: FormGroup;
  showOnlyAdmin: boolean = false;
  invisible = true
  showtimer: boolean = false
  timerSubscribtion!: Subscription;
  istimerRunning: boolean = false
  isFound: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public _data: any, private router: Router, private snackbar: MatSnackBar,
    private api: ApiService, private dialogRef: MatDialogRef<LoginComponent>) {
    if (_data._data === 'Driver') {
      this.driver = true;
    }
    if (_data._data === 'Admin') {
      this.showOnlyAdmin = true;
    }
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      id: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      tripNumber: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    })
  }

  startEnd: string = 'Start Trip'


  showDriverForm(): void {
    this.driver = true;
    this.showOnlyAdmin = false
  }

  showAdminForm(): void {
    this.showOnlyAdmin = true;
    this.driver = true
  }

  //combining
  submitAndClose() {
    this.submit();
  }


  submit() {
    this.api.genericGet('/get-company')
      .subscribe({
        next: async (res: any) => {
          console.log("all company res", res)
          this.isFound = await res.filter((company: any) => company.email.toLowerCase() === this.logInForm.value.email.toLowerCase())
          if (this.logInForm.controls['email'].value === 'admin@operations.com') {
            if (this.logInForm.controls['password'].value === '1234') {
              sessionStorage.setItem('admin', JSON.stringify(this.logInForm.value))
              this.snackbar.open('Admin logged in successfully', 'Ok', { duration: 3000 });
              this.router.navigate(['/super-admin']);
              this.closeDialog();
              return;
            } else {
              this.snackbar.open('Password does not match', 'Ok', { duration: 3000 });
              return;
            }
          }
          if (this.isFound.length === 0) {
            this.snackbar.open('User not found', 'Ok', { duration: 3000 });
            return;
          }
          if (this.isFound[0].password !== this.logInForm.value.password) {
            this.snackbar.open('Password does not match', 'Ok', { duration: 3000 });
            return;
          }
          if (this.isFound[0].status.toLowerCase() === 'pending' || this.isFound[0].status.toLowerCase() === 'declined') {
            this.snackbar.open('Your registration is ' + this.isFound[0].status, 'Ok', { duration: 3000 });
            return;
          }
          // Store company is session storage
          sessionStorage.setItem('company', JSON.stringify(this.isFound))
          this.snackbar.open('Company logged in successfully', 'Ok', { duration: 3000 });
          this.router.navigate(['/company-dashboard'])
          this.closeDialog();
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // Timer start
  displayTime: string = '00:00:00';
  interval: any;
  isRunning: boolean = false;
  startTime: number = 0;

  startStopwatch() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = Date.now() - (this.startTime || 0);
      this.interval = setInterval(() => {
        const elapsed = Date.now() - this.startTime;
        this.displayTime = this.formatTime(elapsed);
      }, 1000);
    }
  }

  stopStopwatch() {
    clearInterval(this.interval);
    this.isRunning = false;
  }

  resetStopwatch() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.displayTime = '00:00:00';
    this.startTime = 0;
  }

  private formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  //Timer end

  check() {
    let tripnumber = this.logInForm.get('tripNumber')?.value;
    if (tripnumber === '0001') {
      this.showtimer = true
    }
  }

  checkid() {
    let diverId: any = this.logInForm.get('id')?.value;
    if (diverId === '86050610') {
      this.invisible = false
    } else {
      this.snackbar.open('invalid driver ID', 'Ok', { duration: 3000 });
    }
  }
}




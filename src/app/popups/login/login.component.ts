import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  startEndText() {
    if (this.startEnd == 'Start Trip') {
      this.startEnd = 'End Trip'
    }
    else {
      this.startEnd = 'Start Trip'
    }
  }

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
    this. closeDialog() ;
  }

  
  submit() {
    if (this.logInForm.controls['password'].value === '1234' && this.logInForm.controls['email'].value === 'admin@operations.com') {
      // localStorage.setItem('user', JSON.stringify(this.logInForm.value))
      sessionStorage.setItem('user', JSON.stringify(this.logInForm.value))
      this.router.navigate(['/super-admin'])
      //wrong email sends a message and doesnt save that email
    } else {
      if (this.logInForm.controls['password'].value === '11111' && this.logInForm.controls['email'].value === 'admin@company.com') {
        // localStorage.setItem('user', JSON.stringify(this.logInForm.value))
        sessionStorage.setItem('user', JSON.stringify(this.logInForm.value))
        this.router.navigate(['/company-dashboard'])
      } else {
        this.snackbar.open('User not found', 'Ok', { duration: 30000 })
      }
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}




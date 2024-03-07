import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  driver: boolean = false;
  logInForm: FormGroup;
  showOnlyAdmin: boolean = false;

   constructor(@Inject(MAT_DIALOG_DATA) public _data: any){ 
    if(_data._data === 'Driver'){
      this.driver = true;
    }
    if(_data._data === 'Admin'){
      this.showOnlyAdmin = true;
    }
    this.logInForm= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      id: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      tripNumber: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    })
  }
  
  startEnd:string = 'Start Trip'

  startEndText(){
    if(this.startEnd == 'Start Trip')
    {
      this.startEnd = 'End Trip'
    }
    else{
      this.startEnd = 'Start Trip'
    }
  }

  showDriverForm(): void {
    this.driver = true;
    this.showOnlyAdmin = false
  }

  showAdminForm(): void{
    this.showOnlyAdmin = true;
    this.driver = true
  }
}




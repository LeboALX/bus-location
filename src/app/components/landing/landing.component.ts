import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/popups/login/login.component';
import { RegisterComponent } from 'src/app/popups/register/register.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  dialogItems: string[] = ['Driver','Admin'];
  currentValue: string = '';

  onInput(event:any){
    this.currentValue = event.target.value;
  }
  
  searchBus!: FormGroup;
  panelColor = new FormControl;

  constructor(private dialog: MatDialog) {
    this.searchBus = new FormGroup({
      shiftNumber: new FormControl('', [Validators.required, Validators.maxLength(6)])
    }) 
  }
  
  login(indx: any): void{
    if(indx === 0) {
      this.dialog.open(LoginComponent,{
        data: {
          _data: 'Admin'
        }
      })
    }
    if(indx === 1) {
      this.dialog.open(LoginComponent,{
        data: {
          _data: 'Driver'
        }
      })
    }
  }

  register(){
    this.dialog.open(RegisterComponent)
  }
}

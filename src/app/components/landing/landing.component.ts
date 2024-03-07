import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDriverComponent } from 'src/app/popups/add-driver/add-driver.component';
import { RegisterComponent } from 'src/app/popups/register/register.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
constructor( private dialog: MatDialog){}
open(){
  this.dialog.open(AddDriverComponent)
}
}

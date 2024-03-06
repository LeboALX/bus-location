import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  dialogItems: string[] = ['Driver','Admin'];
  
  searchBus!: FormGroup;
  panelColor = new FormControl;

  name:string = 'joel'

  constructor() {
    this.searchBus = new FormGroup({
      shiftNumber: new FormControl('', [Validators.required, Validators.maxLength(6)])
    }) 
  }

  log(indx:any) {
    console.log(indx)
  }

}

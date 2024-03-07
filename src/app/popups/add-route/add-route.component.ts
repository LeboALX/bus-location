import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent {
  addRouteForm: FormGroup
  origin: string[] = ['Randburg', 'Fourways', 'Midrand', 'Kyalami', 'Woodmead', 'Vaal'];
  stops: any[] = ['Bryanston', 'Brixton', 'Sandton', 'Hillbrow', 'Westgate', 'Parktown', 'Alex'];
  destination: string[] = ['Randburg', 'Fourways', 'Midrand', 'Kyalami', 'Woodmead', 'Vaal'];
  
  constructor(private snackbar: MatSnackBar) {
    this.addRouteForm = new FormGroup({
      origin: new FormControl('', [Validators.required]),
      stops: new FormControl('', [Validators.required, Validators.min(3)]),
      tripNumber: new FormControl('', [Validators.required, Validators.min(4)]),
      destination: new FormControl('', [Validators.required]),
    })
  }

  submit(): void {
  }
}


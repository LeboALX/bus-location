import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent {
  addRouteForm: FormGroup
  origin: any[] = ['Randburg', 'Fourways', 'Midrand', 'Kyalami', 'Woodmead', 'Vaal'];
  stops: any[] = ['Bryanston', 'Brixton', 'Sandton', 'Hillbrow', 'Westgate', 'Parktown', 'Alex'];
  destination: any[] = ['Randburg', 'Fourways', 'Midrand', 'Kyalami', 'Woodmead', 'Vaal'];
  
  constructor(private snackbar: MatSnackBar, private api: ApiService) {
    this.addRouteForm = new FormGroup({
      origin: new FormControl('', [Validators.required]),
      stops: new FormControl('', [Validators.required]),
      tripNumber: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
    })
  }

  submit(){
    // if(this.addRouteForm.invalid)return;

    this.api.genericPost('/add-route', this.addRouteForm.value)
    this.snackbar.open('Route successfully added','Ok',{duration:3000})

    this.addRouteForm.reset();
  }
}


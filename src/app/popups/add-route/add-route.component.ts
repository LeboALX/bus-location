import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent {
  addRouteForm!: FormGroup;
  origin: any[] = ['Randburg', 'Fourways', 'Midrand', 'Kyalami', 'Woodmead', 'Vaal'];
  stops: any[] = ['Bryanston', 'Brixton', 'Sandton', 'Hillbrow', 'Westgate', 'Parktown', 'Alex'];
  destination: any[] = ['Randburg', 'Fourways', 'Midrand', 'Kyalami', 'Woodmead', 'Vaal'];

  constructor(private snackbar: MatSnackBar, private api: ApiService, @Inject(MAT_DIALOG_DATA) public _data: any) {
    if (_data._data) {
      this.addRouteForm = new FormGroup({
        origin: new FormControl(_data._data.origin, [Validators.required]),
        stops: new FormControl(_data._data.stops, [Validators.required]),
        tripNumber: new FormControl(_data._data.tripNumber, [Validators.required]),
        destination: new FormControl(_data._data.destination, [Validators.required]),
      })
    } else {
      this.addRouteForm = new FormGroup({
        origin: new FormControl('', [Validators.required]),
        stops: new FormControl('', [Validators.required]),
        tripNumber: new FormControl('', [Validators.required]),
        destination: new FormControl('', [Validators.required]),
      })
    }
  }

  submit() {
    if(this.addRouteForm.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    };
    this.api.genericPost('/add-trip', this.addRouteForm.value)
      .subscribe({
        next: (res: any) => {
          if (res._id) {
            this.snackbar.open('Trip successfully added', 'Ok', { duration: 3000 });
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    this.addRouteForm.reset();
  }
}


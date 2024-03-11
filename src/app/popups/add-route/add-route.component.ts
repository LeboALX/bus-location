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

  stopsLocations = [{ title: 'Bryanston', position: { lat: -26.090532, lng: 28.026145 } },
  { title: "Brixton", position: { lat: -26.10192, lng: 28.040242 } },
  { title: "Sandton", position: { lat: -26.091321, lng: 28.023776 } },
  { title: "Hillbrow", position: { lat: -26.14906, lng: 28.009492 } },
  { title: "Westgate", position: { lat: -26.182785, lng: 28.017755 } },
  { title: "Parktown", position: { lat: -26.201923, lng: 28.03123 } },
  { title: "Alex", position: { lat: -26.1086844, lng: 28.0582833 } }]

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
    let busChosenStopsAndLocations: any = [];

    if (this.addRouteForm.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    };

    this.addRouteForm.value.stops.forEach((chosenStop: any) => {
      this.stopsLocations.forEach((stop: any) => {
        if (chosenStop.toLowerCase() === stop.title.toLowerCase()) {
          busChosenStopsAndLocations.push(stop);
        }
      })
    })
    this.addRouteForm.value.stops = busChosenStopsAndLocations;

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


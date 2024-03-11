import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-buses',
  templateUrl: './add-buses.component.html',
  styleUrls: ['./add-buses.component.scss']
})
export class AddBusesComponent implements OnInit {
  // models: string[] = ['Double-decker', 'Single-decker', 'Coach', 'School bus', 'Minibus'];
  models: string[] = ['Double-decker', 'Single-decker', 'Coach', 'School bus', 'Minibus'];
  occupancy: any[] = ['30', '50', ' 65', ' 85', '106'];
  fileElement: any;
  fileUploadResult: any = 0;
  file: any;
  addDriverForm: FormGroup

  constructor(private snackbar: MatSnackBar, private api: ApiService) {
    this.addDriverForm = new FormGroup({
      make: new FormControl('', [Validators.required]),
      busNumber: new FormControl('', [Validators.required, Validators.min(4)]),
      numberPlate: new FormControl('', [Validators.required, Validators.min(8)]),
      discNumber: new FormControl('', [Validators.required, Validators.min(6),]),
      model: new FormControl('', [Validators.required]),
      occupant: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.fileElement = document.getElementById('file') as HTMLInputElement
  }

  fileUpload(e: any): void {
    this.file = e.target.files[0]
    const reader = new FileReader();
    console.log('reader', reader)
    console.log('files', this.fileElement.files.length)
    this.fileUploadResult = this.fileElement.files.length
  }

  submit(): void {
    if (this.addDriverForm.invalid || this.fileUploadResult === 0) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    }
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.api.genericPost('/upload', formData)
    this.api.genericPost('/add-bus', this.addDriverForm.value)
      .subscribe({
        next: (res: any) => {
          if (res._id) {
            this.snackbar.open('Bus successfully added', 'Ok', { duration: 3000 })
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    this.addDriverForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-buses',
  templateUrl: './add-buses.component.html',
  styleUrls: ['./add-buses.component.scss']
})
export class AddBusesComponent implements OnInit {
  models: string[] = ['Double-decker', 'Single-decker', 'Coach', 'School bus', 'Minibus'];
  occupancy: any[] = ['30', '50', ' 65', ' 85', '106'];
  fileElement: any;
  fileUploadResult: any = 0;
  addDriverForm: FormGroup

  constructor(private snackbar: MatSnackBar) {
    this.addDriverForm = new FormGroup({
      make: new FormControl('', [Validators.required]),
      busNumber: new FormControl('', [Validators.required, Validators.min(4)]),
      numberPlate: new FormControl('', [Validators.required, Validators.min(8)]),
      discNumber: new FormControl('', [Validators.required, Validators.min(6),]),
      model: new FormControl('', [Validators.required]),
      occupant: new FormControl('', [Validators.required]),
      upload: new FormGroup({
        uploadDocument: new FormControl(File, Validators.required),
      }),
    })
  }

  ngOnInit(): void {
    this.fileElement = document.getElementById('file') as HTMLInputElement
  }

  fileUpload(e: any): void {
    const reader = new FileReader();
    console.log('reader', reader)
    console.log('files', this.fileElement.files.length)
    this.fileUploadResult = this.fileElement.files.length
  }

  submit(): void {
    if (this.fileUploadResult === 0) {
      this.snackbar.open('Please upload file', 'Ok', { duration: 3000 });
    }
    if (this.addDriverForm.invalid && this.fileUploadResult === 0) return
  }
}

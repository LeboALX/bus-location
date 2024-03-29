import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent {
  addDriverForm: FormGroup
  codes: any[] = ['Code 10', 'Code 14'];
  fileElement: any;
  fileUploadResult: any = 0;
  file: any;
  constructor(private snackbar: MatSnackBar, private api: ApiService) {
    this.addDriverForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      surname: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required]),
      licenseNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      cellNumber: new FormControl('', [Validators.required,]),
      code: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    // Get file input element
    this.fileElement = document.getElementById('file') as HTMLInputElement;
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
    formData.append('file', this.file, this.file.name,);
    this.api.genericPost('/upload', formData)
    this.api.genericPost('/add-driver', this.addDriverForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('res res', res)
          if (res._id) {
            this.snackbar.open('Driver successfully added', 'Ok', { duration: 3000 })
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    this.addDriverForm.reset()
  }
}

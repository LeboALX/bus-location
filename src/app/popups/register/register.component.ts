import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  fileElement: any;
  file: any;
  fileUploadResult: any = 0;
  registrationForm: FormGroup;
  // pictureId: any = `picture-${new Date().getTime()}`

  constructor(private snackbar: MatSnackBar, private api: ApiService) {
    this.registrationForm = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      companyRegistrationNumber: new FormControl('', [Validators.required, Validators.min(999999)]),
      status: new FormControl('pending'),
      // fileId: new FormControl(this.pictureId),
      address: new FormGroup({
        streetName: new FormControl('', Validators.required),
        streetNumber: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required])
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
    // console.log('files', this.fileElement.files)
    this.fileUploadResult = this.fileElement.files.length
  }
  submit(): void {
    if (this.fileUploadResult === 0) {
      this.snackbar.open('Please upload file', 'Ok', { duration: 3000 });
    }
    if (this.registrationForm.invalid && this.fileUploadResult === 0) return

    // Upload file only
    const formData = new FormData();
    formData.append('file', this.file, this.file.name,);
    this.api.genericPost('/upload', formData)

    // Upload register group
    this.api.genericPost('/add-company', this.registrationForm.value)

    this.snackbar.open('Successfully awaiting company verifications', 'Ok', { duration: 3000 });
  }
}

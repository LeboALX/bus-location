import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fileElement: any;
  fileUploadResult: any = 0;
  registrationForm: FormGroup
  cell: any ="[0]{1}[6-8]{1}[0-9]{8}"
  emailp: any =" /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/"
  constructor(private snackbar: MatSnackBar) {
    this.registrationForm = new FormGroup({
      companyName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      companyRegistrationNumber: new FormControl('', [Validators.required, Validators.min(999999)]),
      companyLogo: new FormControl(File, Validators.required),
      address: new FormGroup({
        streetName: new FormControl('', Validators.required),
        streetNumber: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailp)]),
      cellNumber: new FormControl('', [Validators.required, Validators.pattern(this.cell)])
    })
  }

  ngOnInit(): void {
    // Get file input element
    this.fileElement = document.getElementById('file') as HTMLInputElement;
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
    if (this.registrationForm.invalid && this.fileUploadResult === 0) return
    this.snackbar.open('Successfully awaiting company verifications', 'Ok', { duration: 3000 });
  }
}

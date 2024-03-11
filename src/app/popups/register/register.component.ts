import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  registrationForm!: FormGroup;
  foundCompany:any;

  constructor(private snackbar: MatSnackBar, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public _data: any, private dialogRef: MatDialogRef<RegisterComponent>) {
    console.log("Company datas", _data)
    if (_data) {
      this.registrationForm = new FormGroup({
        companyName: new FormControl(_data.companyName, [Validators.required]),
        companyRegistrationNumber: new FormControl(_data.companyRegistrationNumber, [Validators.required, Validators.min(999999)]),
        status: new FormControl('pending'),
        address: new FormGroup({
          streetName: new FormControl(_data.address.streetName, Validators.required),
          streetNumber: new FormControl(_data.address.streetNumber, Validators.required),
          city: new FormControl(_data.address.city, Validators.required),
          code: new FormControl(_data.address.code, Validators.required),
        }),
        email: new FormControl(_data.email, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        cellNumber: new FormControl(_data.cellNumber, [Validators.required])


      })
    }

    else {
      this.registrationForm = new FormGroup({
        companyName: new FormControl('', [Validators.required]),
        companyRegistrationNumber: new FormControl('', [Validators.required, Validators.min(999999)]),
        status: new FormControl('pending'),
        address: new FormGroup({
          streetName: new FormControl('', Validators.required),
          streetNumber: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          code: new FormControl('', Validators.required),
        }),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        cellNumber: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      })
    }
  }

  ngOnInit(): void {
    // Get file input element
    this.fileElement = document.getElementById('file') as HTMLInputElement;
  }
  fileUpload(e: any): void {
    this.file = e.target.files[0]

    const reader = new FileReader();
    console.log('reader', reader)
    this.fileUploadResult = this.fileElement.files.length
  }
  submit(): void {

    this.api.genericGet('/get-company')
    .subscribe({
      next: (res: any) => {
         res.filter((_data:any)=>{
          this.foundCompany = _data.companyRegistrationNumber;
          if(this.registrationForm.get('companyRegistrationNumber')?.value == this.foundCompany)
          {
            console.log("Input value",this.registrationForm.get('companyRegistrationNumber')?.value)
            this.snackbar.open('Company Already Exist','Ok',{duration:3000});
            return;
          }
        })
        
      },
      error: (err: any) => console.log('Error', err),
      complete: () => { }
    })
 

    if (this.registrationForm.invalid && this.fileUploadResult === 0) return
    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('confirmPassword')?.value) {
      this.registrationForm.get('confirmPassword')?.setErrors({ 'pattern': true });
      return;
    }

    

    let formValue = this.registrationForm.value;
    delete formValue.confirmPassword;
    // Upload file only
    const formData = new FormData();
    formData.append('file', this.file, this.file.name,);
    this.api.genericPost('/upload', formData)
      .subscribe({
        next: (res: any) => {
          console.log('file upload res', res)
          if (res.file._id) {
            console.log('File uploaded successfully');
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    // Upload register group
    this.api.genericPost('/add-company', this.registrationForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('commpany res._id', res._id)
          if (res._id) {
            this.snackbar.open('Registration succesfully sent, awaiting verification', 'Ok', { duration: 3000 })
            this.dialogRef.close()
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
      
  }

  close(): void {
    this.dialogRef.close()
  }
}

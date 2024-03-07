import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent {
  cell: any ="[0]{1}[6-8]{1}[0-9]{8}"
  emailp: any =" /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/"
  addDriverForm:FormGroup
 codes:any[]=['Code 10','Code 14'];
 fileElement: any;
 fileUploadResult: any = 0;
  constructor(private snackbar :MatSnackBar){
    this.addDriverForm = new FormGroup({
      Name : new FormControl('' , [Validators.required , Validators.minLength(3)]),
      Surname : new FormControl('' , [Validators.required , Validators.minLength(3)]),
      Idnumber: new FormControl ('', [Validators.required , Validators.min(999999)]),
      Licensenumber: new FormControl ('', [Validators.required , Validators.min(999999)]),
     email:new FormControl('',[Validators.required,Validators.pattern(this.emailp)]),
     cellNumber:new FormControl('',[Validators.required, Validators.pattern(this.cell)]),
     companyLogo: new FormControl(File,Validators.required),
     code:new FormControl('',Validators.required),
     upload:new FormGroup ({
      uploadDocument:new FormControl(File,Validators.required)
     })
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
    if(this.fileUploadResult === 0){
      this.snackbar.open('Please upload file','Ok',{duration: 3000});
    }
    if (this.addDriverForm.invalid && this.fileUploadResult === 0) return

  }
}

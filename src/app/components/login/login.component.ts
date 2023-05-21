import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm!: FormGroup;
  userNameInvalid: string = "loginForm.controls['username'].dirty && loginForm.hasError('required','username')";
  passwordInvalid = "loginForm.controls['password'].dirty && loginForm.hasError('required','password')";

  constructor(private fb: FormBuilder){
    this.loginForm = fb.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this.loginForm.valid){


      // send the object to database
      console.log(this.loginForm.value);


    }else{
      //throw error using toaster and with required field
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Form is invalid");

    }
  }
}

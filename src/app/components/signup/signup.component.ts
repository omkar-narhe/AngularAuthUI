import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder){
    this.signUpForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userName: ['',Validators.required]
    });
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText? this.type = "text" : this.type = "password";
  }


  onSubmit(){
    if(this.signUpForm.valid){

      // send the object to database
      console.log(this.signUpForm.value);

    }else{

      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Form is invalid");

    }
  }
}

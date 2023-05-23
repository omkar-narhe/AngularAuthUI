import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService){
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

  onLogin(){
    if(this.loginForm.valid){      
      // send the object to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          //alert(res.message);
          this.toast.success({detail: "SUCCESS", summary: res.message, duration: 5000});
          this.auth.storeToken(res.token);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          //alert(err?.error.message);
          this.toast.error({detail: "ERROR", summary: "Something went wrong!", duration: 5000});
        }
      })
    }else{
      //throw error using toaster and with required field
      ValidateForm.validateAllFormFields(this.loginForm);
      //alert("Form is invalid");
      this.toast.error({detail: "ERROR", summary: "Form is invalid!", duration: 5000});
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService){
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
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (res => {
          // alert(res.message);
          this.toast.success({detail:"SUCCESS", duration: 5000, summary: res.message});
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error: (err => {
          //alert(err?.error.message);
          this.toast.error({detail:"ERROR", duration: 5000, summary: err?.errors.message});
        })
      })
    }else{

      ValidateForm.validateAllFormFields(this.signUpForm);
      //alert("Form is invalid");
      this.toast.error({detail:"ERROR", duration: 5000, summary: "Form is invalid!"});

    }
  }
}

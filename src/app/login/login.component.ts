import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MainService } from '../main.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  LoginSignUpForm!: FormGroup;
  logoUrl = environment.logoUrl;
  IsRegister = false;
   
  constructor(private router: Router, private _mainService: MainService, private fb: FormBuilder) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        _mainService.HideNavbar = event.url.includes('/login') ? true : false;
        this.LoginSignUpForm = new FormGroup({
          name: new FormControl(''),
          phone: new FormControl(''),
          email: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required)
        });
      }
    });
  }

  generateForm(type: boolean) {
    this.LoginSignUpForm.reset();
    this.IsRegister = type;
    if (this.IsRegister) {
      this.LoginSignUpForm.controls['name'].setValidators([Validators.required]);
      this.LoginSignUpForm.controls['phone'].setValidators([Validators.required]);
    }
    else {
      this.LoginSignUpForm.controls['name'].setValidators([]);
      this.LoginSignUpForm.controls['phone'].setValidators([]);
    }
  }

  doLoginSignUp() {
    const formValues = this.LoginSignUpForm.value;
    formValues.usertype = this._mainService.IsAdmin ? 'A' : 'C';
    this.LoginSignUpForm.reset();
    if (this.IsRegister && !this._mainService.IsAdmin) {
      this.doRegister(formValues);
    }
    console.log(formValues);
  }

  doRegister(formValues: any) {
    const createdDate = new Date().toLocaleDateString('en-GB');
    formValues.orders = [];
    formValues.createdDate = createdDate;
    this._mainService.addData(environment.usersColl, formValues)
    .then(docRef => this.IsRegister = false)
    .catch(err => {
      this._mainService.AlertText = `<div class="alert alert-danger" role="alert"> Woops! Something wrong, Data not inserted.</div>`;
      this._mainService.hideSnackBar(5000);
    });
  }
}

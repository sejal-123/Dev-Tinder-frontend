import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CommonModule, DialogModule, NavbarComponent, FormsModule, InputTextModule, InputNumberModule, RadioButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  visible: boolean = false;
  signUpDetailsDialog: boolean = false;
  loginDetailsDialog: boolean = false;
  genders: any[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];
  selectedGender: string = 'Male';

  @ViewChild('registrationForm') signupForm: NgForm | undefined;
  @ViewChild('loginForm') loginForm: NgForm | undefined;

  constructor(readonly router: Router) {}

  createNewAccount() {
    this.router.navigateByUrl('/signup');
    console.log(this.router);
  }

  showHideDialog() {
    this.visible = !this.visible;
    console.log(this.router);
  }

  toggleSignupDialog() {
    if (this.loginDetailsDialog) {
      this.loginDetailsDialog = false;
    }
    this.signUpDetailsDialog = !this.signUpDetailsDialog;
  }

  onSignUpFormSubmit() {
    if (this.signupForm?.valid) {
      console.log('Submitting form...', this.signupForm?.value);
    }
  }

  toggleLoginDialog(value?: boolean) {
    if (this.signUpDetailsDialog) {
      this.signUpDetailsDialog = false;
    }
    this.loginDetailsDialog = value === true || value === false ? value : !this.loginDetailsDialog;
  }

  onLoginFormSubmit() {
    if (this.loginForm?.valid) {
      console.log('Submitting login form...', this.loginForm?.value);
    }
  }

}

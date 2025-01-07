import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CommonModule, DialogModule, NavbarComponent, FormsModule, InputTextModule, InputNumberModule, RadioButtonModule],
  providers: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  visible: boolean = false;
  signUpDetailsDialog: boolean = false;
  loginDetailsDialog: boolean = false;
  error: string = '';
  genders: any[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];
  selectedGender: string = 'Male';

  @ViewChild('registrationForm') signupForm: NgForm | undefined;
  @ViewChild('loginForm') loginForm: NgForm | undefined;

  constructor(readonly router: Router, private readonly http: HttpClient) {}

  async ngOnInit() {
    let users = [];
    this.http.get('http://localhost:7777/user/getAll').subscribe((data) => {
      console.log(data);
      users = data['data'];
      console.log(users);
    });
  }

  createNewAccount() {
    this.router.navigateByUrl('/signup');
    console.log(this.router);
  }

  showHideDialog() {
    this.visible = !this.visible;
  }

  toggleSignupDialog() {
    if (this.loginDetailsDialog) {
      this.loginDetailsDialog = false;
    }
    this.signUpDetailsDialog = !this.signUpDetailsDialog;
  }

  async onSignUpFormSubmit() {
    try {
      if (this.signupForm?.valid) {
        const ans = this.http.post('http://localhost:7777/signup', {
          firstName: this.signupForm.value['firstName'],
          lastName: this.signupForm.value['lastName'],
          emailId: this.signupForm.value['emailId'],
          password: this.signupForm.value['password'],
          age: this.signupForm.value['age'],
          gender: this.signupForm.value['gender']
        });
        ans.subscribe(data => {
          console.log(data);
          if(data['status'] === 400) {
            this.error = data['error'];
          } else {
            alert('User added successfully!.. Please login now...')
          }
        });
        console.log('Submitting form...', this.signupForm?.value);
      }
    } catch(e) {
      console.log(e);
      throw new Error(e);
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

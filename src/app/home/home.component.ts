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
  detailsDialog: boolean = false;
  genders: any[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];
  selectedGender: string = 'Male';

  @ViewChild('registrationForm') form: NgForm | undefined;


  constructor(readonly router: Router) {}

  createNewAccount() {
    this.router.navigateByUrl('/signup');
    console.log(this.router);
  }

  showHideDialog() {
    this.visible = !this.visible;
    console.log(this.router);
  }

  showHideDetailsDialog() {
    this.detailsDialog = !this.detailsDialog;
  }

  onFormSubmit() {
    if (this.form?.valid) {
      console.log('Submitting form...', this.form.value);
    }
  }

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, ButtonModule, DialogModule, CommonModule, HomeComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dev-tinder';
  visible = false;

  constructor(readonly router: Router){}
}

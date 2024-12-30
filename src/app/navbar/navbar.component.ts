import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, FormsModule, CommonModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    ngOnInit() {
    }
}

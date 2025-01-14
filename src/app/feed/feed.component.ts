import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-feed',
  imports: [TabsModule, FormsModule, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  activeUser: any = {};
  userFeeds: any[] = [];
  matches: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get('http://localhost:7777/user/feed').subscribe(data => {
      this.userFeeds = data['data'];
      console.log(this.userFeeds);
    }, error => {
      alert('Please login first');
      console.log('Error', error);
      this.router.navigateByUrl('/')
    });
    this.http.get('http://localhost:7777/user/getActiveUser').subscribe(data => {
      this.activeUser = data['data'];
      console.log(this.activeUser);
    }, error => {
      alert('Please login first');
      console.log('Error', error);
      this.router.navigateByUrl('/')
    });
    this.http.get('http://localhost:7777/user/connections').subscribe(data => {
      this.matches = data['data'];
      console.log(this.matches);
    }, error => {
      alert('Please login first');
      console.log('Error', error);
      this.router.navigateByUrl('/')
    });
  }

}

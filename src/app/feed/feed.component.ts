import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-feed',
  imports: [TabsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  activeUser: any = {};
  userFeeds: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:7777/user/feed').subscribe(data => {
      this.userFeeds = data['data'];
      console.log(this.userFeeds);
    }, error => {
      alert('Please login first');
      console.log('Error', error);
    });
    this.http.get('http://localhost:7777/user/getActiveUser').subscribe(data => {
      this.activeUser = data['data'];
      console.log(this.activeUser);
    }, error => {
      alert('Please login first');
      console.log('Error', error);
    });
  }

}

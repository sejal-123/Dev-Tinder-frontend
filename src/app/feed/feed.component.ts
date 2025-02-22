import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-feed',
  imports: [TabsModule, FormsModule, CommonModule, ChipModule, ButtonModule, DialogModule, InputTextModule, TagModule  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  activeUser: any = {};
  userFeeds: any[] = [];
  matches: any[] = [];
  requests: any[] = [];
  isLoggedIn: boolean = false;
  toggleAccountDetails: boolean = false;
  accountDetailsDialog: boolean = false;
  @ViewChild('updateForm') updateForm: NgForm | undefined;
  skills: any[] = [];
  

  constructor(private http: HttpClient, private router: Router, private ref: ChangeDetectorRef) {}

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
    this.fetchRequests();
    this.fetchMatches();  
  }

  fetchMatches() {
    this.http.get('http://localhost:7777/user/connections').subscribe(data => {
      this.matches = data['data'];
      console.log(this.matches);
    }, error => {
      alert('Please login first');
      console.log('Error', error);
      this.router.navigateByUrl('/')
    });
    this.ref.detectChanges();
  }

  fetchRequests() {
    this.http.get('http://localhost:7777/user/requests/received').subscribe(data => {
      this.requests = data['data'];
      console.log(this.requests);
    }, error => {
      alert('Please login first');
      console.log('Error', error);
      this.router.navigateByUrl('/')
    });
    this.ref.detectChanges();

  }                     

  onToggleAccountDetails() {
    this.toggleAccountDetails = !this.toggleAccountDetails;
  }

  editAccountInformation() {
    console.log(this.updateForm.value);
    this.http.patch('http://localhost:7777/profile/edit', {
      firstName: this.updateForm.value['firstName'],
      lastName: this.updateForm.value['lastName'],
      skills: this.updateForm.value['skills']?.map(ele => ele.name),
      photoUrl: this.updateForm.value['photoUrl']
    }).subscribe((data) => {
      if (data) {
        alert('updated successfully');
        console.log(data['data']);
      }
    }, error => {
      console.log(error);
    });
    console.log('editing account details...');
    this.toggleAccountDetailsDialog();
  }

  logout() {
    this.http.post('http://localhost:7777/logout', {}).subscribe(
      data => {
        console.log(data);
        if(data['message'] === 'Logged out successfully') {
          localStorage.removeItem('token');
          alert('Logged out successfully');
          this.router.navigateByUrl('/');
        }
      }, error => {
        alert('Please login first');
        console.log('Error', error);
        this.router.navigateByUrl('/');
      }
    )
  }

  toggleAccountDetailsDialog() {
    this.accountDetailsDialog = !this.accountDetailsDialog;
    this.updateForm.value['firstName']=this.activeUser.firstName;
  }

  onUpdateFormSubmit() {
    console.log(this.updateForm);
    this.editAccountInformation();
  }

  async addSkill() {
    this.skills.push({ label: this.updateForm.value['skills'], name: this.updateForm.value['skills'] });
    this.updateForm.value['skills'] = this.skills;
    console.log(this.skills, this.updateForm);
  }

  requestAction(request, action) {
    console.log(request, action);
    const url = 'http://localhost:7777/request/review/';
    const completeUrl = action ? `${url}accepted/${request._id}` : `${url}rejected/${request._id}`;
    this.http.post(completeUrl, {}).subscribe(data => {
      this.fetchRequests();
      this.fetchMatches();
    }, error => {
      console.log(error);
    });
  }

  dragStart(event, element) {
    const div = document.getElementsByClassName(element)[0];
    div.remove();
    const location = document.getElementsByClassName('user-feed')[0]?.getBoundingClientRect();
    const url = 'http://localhost:7777/request/send/';
    let newReq = '';
    if (location.x > event.screenX) {
      newReq = `${url}ignored/${element}`;
    } else {
      newReq = `${url}interested/${element}`;
    }
    this.http.post(newReq, {}).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  sendConnectionRequest(element, value) {
    const div = document.getElementsByClassName(element)[0];
    div.remove();
    const url = 'http://localhost:7777/request/send/';
    let newReq = '';
    if (!value) {
      newReq = `${url}ignored/${element}`;
    } else {
      newReq = `${url}interested/${element}`;
    }
    this.http.post(newReq, {}).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}

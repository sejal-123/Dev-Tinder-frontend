import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
    // { path: '', component: AppComponent},
    { path: 'home', component: HomeComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'feed', component: FeedComponent}
];

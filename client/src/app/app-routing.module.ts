import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed/feed.component';

import { CardGridComponent } from './content/card-grid/card-grid.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';

import { BookViewComponent } from './book/book-view/book-view.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';

// import { DashboardComponent }   from './dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '#', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: CardGridComponent },
    { path: 'grid/:id', component: CardGridComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'profile/:id', component: ProfilePageComponent },
    { path: 'book/:id', component: BookViewComponent },
    { path: 'book/details/:id', component: BookDetailsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

// Example paths
// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// { path: 'dashboard',  component: DashboardComponent },
// { path: 'detail/:id', component: HeroDetailComponent },
// { path: 'heroes',     component: HeroesComponent }

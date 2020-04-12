import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

import { FeedModule } from '../feed/feed.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FeedModule
  ],
  declarations: [
      ProfileComponent,
      ProfilePageComponent
  ],
  exports: [ // TODO: make pages to export instead
    ProfilePageComponent
  ]
})
export class ProfileModule { }

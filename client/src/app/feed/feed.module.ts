import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityComponent } from './activity/activity.component';
import { FeedComponent} from './feed/feed.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
      ActivityComponent,
      FeedComponent
  ],
  exports: [ // TODO: make pages to export instead
    FeedComponent
  ]
})
export class FeedModule { }

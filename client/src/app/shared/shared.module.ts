import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';
    import { RegistrationDialog } from './services/authentication.service';
import { ContentService } from './services/content.service';
import { FeedService } from './services/feed.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  declarations: [RegistrationDialog],
  exports: [],
  providers: [
    AuthenticationService,
    ContentService,
    FeedService,
    HttpService,
    UserService
  ],
  entryComponents: [
      RegistrationDialog
  ]
})
export class SharedModule { }

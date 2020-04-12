import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookViewComponent } from './book-view/book-view.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    SlideshowModule,
    FlexLayoutModule,
    RouterModule,
    // Material
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    BookViewComponent,
    BookDetailsComponent
  ],
  exports: [BookViewComponent]
})
export class BookModule { }

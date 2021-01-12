import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SwiperModule } from 'swiper/angular';

import { BookViewComponent } from './book-view/book-view.component';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    // Material
    MatButtonModule,
    MatCardModule,
    SwiperModule
  ],
  declarations: [
    BookViewComponent,
    BookDetailsComponent
  ],
  exports: [BookViewComponent]
})
export class BookModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardGridComponent } from './card-grid/card-grid.component';
import { ContentCardComponent } from './content-card/content-card.component';

import { UploadModule } from '../upload/upload.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookCardComponent } from './content-card/book-card/book-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    // UploadModule
    RouterModule
  ],
  declarations: [
      CardGridComponent,
      ContentCardComponent,
      BookCardComponent
  ],
  exports: [ // TODO: make pages to export instead
    CardGridComponent
  ]
})
export class ContentModule { }

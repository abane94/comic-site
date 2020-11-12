import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StudioRoutingModule } from './studio-routing.module';
import { StudioHomeComponent } from './studio-home/studio-home.component';
import { MaterialModule } from '../material.module';

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { UploadModule } from '../upload/upload.module';



@NgModule({
  declarations: [StudioHomeComponent, BookEditorComponent],
  imports: [
    CommonModule,
    StudioRoutingModule,
    MatIconModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UploadModule
  ]
})
export class StudioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StudioRoutingModule } from './studio-routing.module';
import { StudioHomeComponent } from './studio-home/studio-home.component';
import { MaterialModule } from '../material.module';

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { UploadModule } from '../upload/upload.module';
import { OrdererComponent } from './orderer/orderer.component';
import { BookListComponent } from './book-list/book-list.component';



@NgModule({
  declarations: [StudioHomeComponent, BookEditorComponent, OrdererComponent, BookListComponent],
  imports: [
    CommonModule,
    DragDropModule,
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioRoutingModule } from './studio-routing.module';
import { StudioHomeComponent } from './studio-home/studio-home.component';

import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [StudioHomeComponent],
  imports: [
    CommonModule,
    StudioRoutingModule,
    MatIconModule
  ]
})
export class StudioModule { }

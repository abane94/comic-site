import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioRoutingModule } from './studio-routing.module';
import { StudioHomeComponent } from './studio-home/studio-home.component';



@NgModule({
  declarations: [StudioHomeComponent],
  imports: [
    CommonModule,
    StudioRoutingModule
  ]
})
export class StudioModule { }

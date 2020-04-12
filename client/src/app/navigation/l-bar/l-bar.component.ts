import { Component } from '@angular/core';

@Component({
  selector: 'l-bar',
  template:
  `
    <menu-bar (toggleSideBar)="toggleSideBar()"></menu-bar>
    <side-bar [opened]="sideBarOpen">
      <ng-content></ng-content>
    </side-bar>
  `
  ,
  // templateUrl: './app.component.html',
  styleUrls: ['./l-bar.component.css'],
})
export class LBarComponent {
  sideBarOpen =  true;

  toggleSideBar(): void {
    console.log('toggle from l bar');
    this.sideBarOpen = !this.sideBarOpen;
  }
}

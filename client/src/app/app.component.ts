import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <l-bar>
      <mat-card class="main page">
        <router-outlet></router-outlet>
      </mat-card>
    </l-bar>
  `,  // <material-tutorial></material-tutorial>
  // templateUrl: './app.component.html',  // this has the material markup
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}

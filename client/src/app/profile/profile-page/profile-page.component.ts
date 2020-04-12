import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'profile-page',
    template: `
        <div id="prof">
            <profile></profile>
        </div>
        <!-- <h1> Profile goes here </h1> -->

    `,
    styles: [`
        h1 {
            margin: auto;
        }
        #prof {
            width: 80%;
            margin: auto;
        }
    `]
})

export class ProfilePageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

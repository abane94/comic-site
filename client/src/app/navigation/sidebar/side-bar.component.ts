import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {
    @Input()
    opened = true;
    private details: Object = {
        'first_name': 'Aris',
        'last_name': 'Husanu',
        'profile_thumb': 'some location'
    };

    constructor() {}

    ngOnInit(): void {
        // this.heroService.getHeroes()
        //     .then(heroes => this.heroes = heroes.slice(1, 5));
        // token = localstorage['token'];
        // if (token){
            // this.userDetailsService.getDetails()
            //     .then(data => this.details = data.details);
    }

    public toggle(open?: boolean): boolean {
        if (!open && open !== false) {
            return this.opened = !this.opened;
        }
        return this.opened = open ? true : false;
    }
}

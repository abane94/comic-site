import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css']
})

export class MenuBarComponent implements OnInit {
    private details: Object;
    @Output() toggleSideBar = new EventEmitter();

    constructor(
      public auth: AuthenticationService,
      private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        let detailsStr = localStorage.getItem('user_details');
        this.details = JSON.parse(detailsStr);
        if (!this.details) {
            detailsStr = sessionStorage.getItem('user_details');
            this.details = JSON.parse(detailsStr);
        }
        if (!this.details) {
            const token = localStorage.getItem('token');
            if (token) {
                // call for user details with token
            }
        }
    }
}

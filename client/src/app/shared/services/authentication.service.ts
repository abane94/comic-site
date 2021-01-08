import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../../../models';

import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
// import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

// for dialog
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// TODO: prevent multiple login/regisiter attempts from happening concurrently, this probably only happened due to backend breakpoints, but would still be good to block



@Injectable()
export class AuthenticationService implements OnInit {

    // public user_details: object;
    // public user_details: User;
    private usersUrl = 'api/user/';

    socialUser: SocialUser;
    user: User;
    private loggedIn: boolean;
    private token: string;

    constructor(private http: HttpService, private authService: AuthService, private dialog: MatDialog) {
        this.authService.authState.subscribe((user) => {
            if (user) {
                this.http.post<User>(this.usersUrl + 'auth/', {
                    id_token: user['idToken']
                }).subscribe(userData => {
                    // return from the sever
                    if (!userData || (userData && !userData._id)) {
                        // ask to register
                        this.openDialog(userData);
                    } else {
                        console.log('Authentication service says: ' + userData);
                        console.log('Returned to auth service');
                        this.user = userData;
                        this.token = this.user.token;
                        this.loggedIn = (user != null);
                    }
                })
            }
          });
    }

    public getToken(): string {
      return this.token;
    }

    public isAuthenticated() {
      return !!this.user;
    }

    public isCreator() {
      return this.user && this.user.isCreator;
    }

    private handleError(error: any): void {
        console.error('An error ocurred in AuthenticationService', error); // for demo purposes only
    }

    ngOnInit() {
        // var details = JSON.parse(localStorage.getItem('user_details'));
        // var t = JSON.parse(localStorage.getItem('token'));
        // if (details){
        //     this.user_details = details;
        // }
    }


    // return ing booleans might be more work than worth it, considering they should be promises
    // and this function would just set the global variables
    // public login(email: string, pass: string): void {
    public login(): void {
        // TODO: remove authentication from client
        // this.http.get(this.usersUrl + '?first_name=' + email).subscribe(
        //     response => {
        //         // const pr = response[0] as object;
        //         const pr = response as User;
        //         if (pr.last_name && pr.last_name.toLowerCase() === pass.toLowerCase()) {
        //             this.user_details = pr;
        //             // consider delegating local storage calls to a new service
        //             localStorage.setItem('user_details', JSON.stringify(this.user_details));
        //             localStorage.setItem('token', this.user_details.token);
        //             // return true;
        //         }
        //         console.dir(response);
        //         // r = (!!response);
        //     },
        //     err => {
        //         // handle authentication errors, like invalid user/pass
        //         this.handleError(err);
        //     }
        // );

        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID); // sign in with google
    }

    public logout(): boolean {

        this.authService.signOut();
        this.user = null;
        this.loggedIn = false;
        // localStorage.clear(); // might be a bit much if other things get stored there
        // this.user_details = undefined; // or some falsey value
        // return true;
        // // return false;
        return true;
    }

    // this might need to be in another service
    public register(): boolean {
        return false;
    }

    openDialog(data: any): void {
        const dialogRef = this.dialog.open(RegistrationDialog, {
          width: '250px',
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          console.log('TODO register new user');
          this.http.post<User>(this.usersUrl, {...data, ...result}).subscribe((res) => {
            // if (res) {
                console.log('Authentication service says: ' + res);
                console.log('Returned to auth service');
                // this.authService.signOut();
                this.user = res;
                this.loggedIn = (res != null);
                this.token = this.user.token;
            // }
          });
          // logic to register new user
        });
      }

    // post call to get the credentials
}


@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
        <!-- <h1 mat-dialog-title>Hi {{data.name}}</h1> -->
        <h1 mat-dialog-title>Hey, are you new here? to create an account we just need a few more details</h1>
        <div mat-dialog-content>
        <p>Do want to use a display name?</p>
        <mat-form-field>
            <input matInput [(ngModel)]="data.displayName">
        </mat-form-field>
        </div>
        <div mat-dialog-actions>
        <button mat-button (click)="onCancelClick()">Cancel</button>
        <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
        </div>
    `,
  })
  export class RegistrationDialog {

    constructor(
      public dialogRef: MatDialogRef<RegistrationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {name: string, displayName: string}) {}

    onCancelClick(): void {
      this.dialogRef.close();
    }

  }

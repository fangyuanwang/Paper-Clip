import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public _currentUserUid: string;
  public isSignedInStream: Observable<boolean>;
  
  get currentUserUid(): string {
    return this._currentUserUid;
  }

  constructor(private afAuth: AngularFireAuth, 
    private router: Router) { 
      this.afAuth.authState.subscribe( (user: firebase.User) => { 
      if (user) {
        console.log("Signed in as ", user);
        this._currentUserUid = user.uid;
      } else {
        console.log("User not signed in");
        this._currentUserUid = '';
      }
     });

    this.isSignedInStream = this.afAuth.authState
      .map<firebase.User, boolean>( (user: firebase.User) => { 
        return user != null;
    });
    }

  signInWithRosefire(): void {
    Rosefire.signIn(environment.registryToken, (error, rfUser: RosefireUser) => {
    if (error) {
      // User not logged in!
      console.error(error);
      return;
    }
    // console.log("Rosefire is done. User: ", rfUser);
    this.afAuth.auth.signInWithCustomToken(rfUser.token).then( (authState) => { 
      // console.log("Firebase signin is done now. User: ", authState);
      this.router.navigate(["/"]);
      });
    });
  }

  signOut(): void {
     this.afAuth.auth.signOut();
     this.router.navigate(['/signin']);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase/app';
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "app/services/auth.service";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  showSignOut = false;

  readonly themePath = 'themes';
  currentTheme: Subject<Number>;
  private signedInSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    private db: AngularFireDatabase,
  ) {
    this.currentTheme = new BehaviorSubject<Number>(0);
  }

  ngOnInit(): void {
    this.signedInSubscription = this.authService.isSignedInStream.subscribe( (isSignedIn: boolean) => { 
      if (isSignedIn) {
        firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).on('value',  (snapshot: firebase.database.DataSnapshot) => {
          if (snapshot.val() >= 0) {
            this.currentTheme.next(snapshot.val());
          } else {
            firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(0);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.signedInSubscription.unsubscribe();
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).off();
  }

  setToDefaultTheme() {
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(0);
  }

  setToBlueGrayTheme() {
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(1);
  }

  setToPinkTheme() {
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(2);
  }

  setToTealTheme() {
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(3);
  }

}
  
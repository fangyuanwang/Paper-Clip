import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase/app';
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "app/services/auth.service";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

enum ThemeType {
  indigo = 0,
  blugray = 1,
  pink = 2,
  teal = 3
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  showSignOut = false;

  readonly themePath = 'themes';
  private themeSubscription: Subscription;
  currentTheme: Subject<ThemeType>;

  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    private db: AngularFireDatabase,
  ) {
    this.currentTheme = new BehaviorSubject<ThemeType>(ThemeType.indigo);
    
  }

  ngOnInit(): void {
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).once('value',  (snapshot: firebase.database.DataSnapshot) => {
      console.log(snapshot.val()); 
      if (snapshot.val()) {
        this.currentTheme.next(snapshot.val());
      }
    });
  }

  ngOnDestroy(): void {
  }

  setToDefaultTheme() {
    this.currentTheme.next(ThemeType.indigo);
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(0);
  }

  setToBlueGrayTheme() {
    this.currentTheme.next(ThemeType.blugray);
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(1);
  }

  setToPinkTheme() {
    this.currentTheme.next(ThemeType.pink);
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(2);
  }

  setToTealTheme() {
    this.currentTheme.next(ThemeType.teal);
    firebase.database().ref(`/${this.themePath}/${this.authService.currentUserUid}`).set(3);
  }

}
  
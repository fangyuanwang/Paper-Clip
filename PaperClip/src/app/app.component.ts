import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase/app';
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSignOut = false;
  private authStateSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {

  }

}

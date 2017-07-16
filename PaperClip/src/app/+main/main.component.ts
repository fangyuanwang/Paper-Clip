import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from "rxjs/Subscription";

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private authStateSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth, 
      private router: Router) {
  }

  ngOnInit() {
    this.authStateSubscription = this.afAuth.authState.subscribe( (user: firebase.User) => { 
      if (user) {
        // Signin just happen

      } else {
        //Signout just happen
        this.router.navigate(["/signin"]);
      }
     });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }
  
  signOut(): void {
    this.afAuth.auth.signOut();
  }

}

import { Component, OnInit } from '@angular/core';
import 'rosefire';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { environment } from "environments/environment";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../shared/common.scss' , './sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
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

}

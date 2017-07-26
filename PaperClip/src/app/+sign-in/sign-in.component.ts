import { Component, OnInit } from '@angular/core';
import 'rosefire';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { AuthService } from "app/services/auth.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../shared/common.scss' , './sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    var loc = window.location.pathname;
  }

  

}

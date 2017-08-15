import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from "rxjs/Subscription";

import * as firebase from 'firebase/app';
import { FlashcardService } from "app/services/flashcard.service";
import { NoteService } from "app/services/note.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentRoute = '/';

  constructor(public flashcardService: FlashcardService,
    public noteService: NoteService) {
  }
  get numColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else {
      return 3;
    } 
  }

  ngOnInit() {
  }


}

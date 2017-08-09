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

  constructor(public flashcardService: FlashcardService,
    public noteService: NoteService) {
  }

  ngOnInit() {
  }


}

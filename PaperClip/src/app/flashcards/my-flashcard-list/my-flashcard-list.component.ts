import { FlashcardGroupDialogComponent } from './../flashcard-group-dialog/flashcard-group-dialog.component';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FlashcardService, FlashcardGroupRoute } from "app/services/flashcard.service";

@Component({
  selector: 'app-my-flashcard-list',
  templateUrl: './my-flashcard-list.component.html',
  styleUrls: ['./my-flashcard-list.component.scss']
})
export class MyFlashcardListComponent implements OnInit {

  currentRoute = 'myflashcards';
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService,
    private dialog: MdDialog) {

  }

  ngOnInit() {
    this.flashcardService.showMyFlashcardGroupRoute(FlashcardGroupRoute.myflashcards);
  }
  showDialog() {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {};
    this.dialog.open(FlashcardGroupDialogComponent, dialogConfig);
  }

}

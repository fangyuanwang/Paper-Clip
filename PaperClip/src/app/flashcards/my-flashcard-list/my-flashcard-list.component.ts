import { FlashcardDialogComponent } from './../flashcard-dialog/flashcard-dialog.component';
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
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService,
    private dialog: MdDialog) {

  }

  ngOnInit() {
    // this.flashcardService.showMyFlashcardGroupRoute(FlashcardGroupRoute.all);
  }
  showDialog() {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {};
    this.dialog.open(FlashcardDialogComponent, dialogConfig);
  }

}

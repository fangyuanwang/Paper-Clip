import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FlashcardService, FlashcardRoute } from "app/services/flashcard.service";

@Component({
  selector: 'app-my-flashcard-list',
  templateUrl: './my-flashcard-list.component.html',
  styleUrls: ['./my-flashcard-list.component.scss']
})
export class MyFlashcardListComponent implements OnInit {
  flashcards:string[];
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService) {

     }

  ngOnInit() {

    this.flashcards   = ['1', '2', '3', '4'];
    this.flashcardService.showMyFlashcardsRoute(FlashcardRoute.all);
  }

}

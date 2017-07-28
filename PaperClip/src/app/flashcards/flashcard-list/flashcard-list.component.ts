import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashcardService, FlashcardRoute } from "app/services/flashcard.service";

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {
  flashcards:string[];
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService) { }

  ngOnInit() {

    this.flashcards   = ['1', '2', '3', '4'];
    this.flashcardService.showMyFlashcardsRoute(FlashcardRoute.myflashcards);
  }

}

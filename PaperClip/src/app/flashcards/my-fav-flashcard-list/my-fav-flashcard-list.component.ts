import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FlashcardRoute, FlashcardService } from "app/services/flashcard.service";

@Component({
  selector: 'app-my-fav-flashcard-list',
  templateUrl: './my-fav-flashcard-list.component.html',
  styleUrls: ['./my-fav-flashcard-list.component.scss']
})
export class MyFavFlashcardListComponent implements OnInit {
  flashcards:string[];
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService) { }

  ngOnInit() {

    this.flashcards   = ['1', '2', '3', '4'];
    this.flashcardService.showMyFlashcardsRoute(FlashcardRoute.myfavs);
  }

}

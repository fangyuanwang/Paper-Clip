import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FlashcardGroupRoute, FlashcardService } from "app/services/flashcard.service";

@Component({
  selector: 'app-my-fav-flashcard-list',
  templateUrl: './my-fav-flashcard-list.component.html',
  styleUrls: ['./my-fav-flashcard-list.component.scss']
})
export class MyFavFlashcardListComponent implements OnInit {
  flashcards:string[];
  currentRoute = 'myfavorites';

  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService) { }

  ngOnInit() {
    this.flashcardService.showMyFlashcardGroupRoute(FlashcardGroupRoute.myfavs);
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
}

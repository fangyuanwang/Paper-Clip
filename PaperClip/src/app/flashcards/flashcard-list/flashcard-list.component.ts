import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashcardService, FlashcardGroupRoute } from "app/services/flashcard.service";

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {
  currentRoute = 'all';
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService) { }

  ngOnInit() {
    this.flashcardService.showMyFlashcardGroupRoute(FlashcardGroupRoute.all);
  }
  get numColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else if (window.innerWidth < 1300) {
      return 3;
    } else {
      return 4;
    }
  }
}

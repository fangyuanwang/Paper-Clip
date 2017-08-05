import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashcardService, FlashcardGroupRoute } from "app/services/flashcard.service";

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService) { }

  ngOnInit() {
    this.flashcardService.showMyFlashcardGroupRoute(FlashcardGroupRoute.all);
  }

}

import { FlashcardService, FlashcardRoute } from 'app/services/flashcard.service';
import { ActivatedRoute } from '@angular/router';
import { EditMode } from 'app/notes/note/note.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flashcard-group-list',
  templateUrl: './flashcard-group-list.component.html',
  styleUrls: ['./flashcard-group-list.component.scss']
})
export class FlashcardGroupListComponent implements OnInit {
  title = "Some flashcard title"
  flashcards: string[];
  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService) { }

  ngOnInit() {

    this.flashcards = ['1', '2', '3', '4'];
    this.flashcardService.showMyFlashcardsRoute(FlashcardRoute.myfavs);
  }

}

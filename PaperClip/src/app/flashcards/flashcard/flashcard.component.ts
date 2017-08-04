import { FlashCard } from './../../models/flashcard';
import { Component, OnInit, Input } from '@angular/core';
import { EditMode } from "app/notes/note/note.component";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {


  isFavorited: boolean = false;
  @Input() flashcard: FlashCard;
  editingMode = EditMode.notEditable;

  constructor() { }

  ngOnInit() {
  }
  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
  }
}

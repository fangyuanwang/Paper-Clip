import { Component, OnInit, Input } from '@angular/core';
import { EditMode } from "app/notes/note/note.component";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {


  isFavorited: boolean = false;
  @Input() cardType: string;
  editingMode = EditMode.notEditable;

  constructor() { }

  ngOnInit() {
    if (this.cardType == 'myfavorites') {
      this.isFavorited = true;
    } else {
      this.isFavorited = false;
    }

    if (this.cardType == 'myflashcards') {
      this.editingMode = EditMode.displayEditButtons;
    }
  }
  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
  }
}

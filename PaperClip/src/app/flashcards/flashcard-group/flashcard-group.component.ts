import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashCard } from './../../models/flashcard';
import { EditMode } from 'app/notes/note/note.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flashcard-group',
  templateUrl: './flashcard-group.component.html',
  styleUrls: ['./flashcard-group.component.scss']
})
export class FlashcardGroupComponent implements OnInit {

isFavorited: boolean = false;
flashcardKey: string;
  @Input() cardType: string;
  editingMode = EditMode.notEditable;
  flashcard: FlashCard;
  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {

     this.route.params.subscribe((routeParams: Params) => {
      const flashcardKey = routeParams["flashcardKey"];
      this.flashcardKey = flashcardKey;
      // TODO : connect with db for each flashcardgroups
      // this.photoStream = this.db.object('flashcard/' + flashcardKey);
      // this.photoStream.subscribe((value: Photo) => {
      //   this.photo.uid = value.uid;
      //   this.photo.$key = value.$key;
      //   this.photo.caption = value.caption;
      //   this.photo.imageUrl = value.imageUrl;
      // });
    });
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

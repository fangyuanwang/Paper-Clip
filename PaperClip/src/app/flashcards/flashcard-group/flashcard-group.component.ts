import { AuthService } from './../../services/auth.service';
import { FlashCardGroup } from './../../models/flashcard-group';
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

  flashcardKey: string;
  @Input() flashcardGroup: FlashCardGroup;
  editingMode = EditMode.notEditable;
  flashcard: FlashCard;
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

  }
}

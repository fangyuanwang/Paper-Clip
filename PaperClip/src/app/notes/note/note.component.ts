import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Note } from "app/models/note";
import { AuthService } from "app/services/auth.service";
import { NoteService } from "app/services/note.service";

export enum EditMode {
  notEditable = 0,
  displayEditButtons = 1
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  isFavorited: boolean = false;
  @Input() note: Note;
  editingMode = EditMode.notEditable;

  constructor(public authService: AuthService,
    public noteService: NoteService) {
  }

  ngOnInit() {

    if (this.note.uid == this.authService.currentUserUid) {
      this.editingMode = EditMode.displayEditButtons;
    }
    this.isFavorited = this.note.favoriteBy == this.authService.currentUserUid;
  }

  //temporary method for toggle state
  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    var updateNote = new Note();
    updateNote.content = this.note.content;
    updateNote.title = this.note.title;
    updateNote.uid = this.note.uid;
    if (this.isFavorited) {
      updateNote.favoriteBy = this.authService.currentUserUid;
    } else {
      updateNote.favoriteBy = '';
    }

    this.noteService.update(this.note.$key, updateNote);

  }


}

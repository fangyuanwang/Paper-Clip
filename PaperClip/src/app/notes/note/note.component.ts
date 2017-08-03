import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Note } from "app/models/note";
import { AuthService } from "app/services/auth.service";
import { NoteService } from "app/services/note.service";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { NoteDialogComponent } from "app/notes/note-dialog/note-dialog.component";

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
    public noteService: NoteService,
    private dialog: MdDialog) {
  }

  ngOnInit() {

    if (this.note.uid == this.authService.currentUserUid) {
      this.editingMode = EditMode.displayEditButtons;
    }
    this.isFavorited = this.note.favoriteBy == this.authService.currentUserUid;
  }

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

  showEditDialog(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {note: this.note};
    this.dialog.open(NoteDialogComponent, dialogConfig);
  }

  remove(): void {
    this.noteService.remove(this.note.$key);
  }

}

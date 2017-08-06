import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Note } from "app/models/note";
import { AuthService } from "app/services/auth.service";
import { NoteService } from "app/services/note.service";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { NoteDialogComponent } from "app/notes/note-dialog/note-dialog.component";
import { DeleteType, DeleteDialogComponent } from "app/delete-dialog/delete-dialog.component";
import { NoteDisplayDialogComponent } from "app/notes/note-display-dialog/note-display-dialog.component";

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
  displayNoteContent: string;
  displayMore = false;

  constructor(public authService: AuthService,
    public noteService: NoteService,
    private dialog: MdDialog) {
  }

  ngOnInit() {

    if (this.note.uid == this.authService.currentUserUid) {
      this.editingMode = EditMode.displayEditButtons;
    }
    if (this.note.favoriteBy && this.note.favoriteBy[this.authService.currentUserUid]) {
      this.isFavorited = true;
    } else {
      this.isFavorited = false;
    }

    if (this.note.favoriteBy == undefined) {
      this.note.favoriteBy = {};
    }

    if (this.note.content.length > 29) {
      this.displayNoteContent = this.note.content.substring(0, 25) + '...';
      this.displayMore = true;
    } else {
      this.displayNoteContent = this.note.content;
    }
  }

  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    var updateNote = new Note();
    updateNote.content = this.note.content;
    updateNote.title = this.note.title;
    updateNote.uid = this.note.uid;
    updateNote.favoriteBy = this.note.favoriteBy;
    if (this.isFavorited) {
      updateNote.favoriteBy[this.authService.currentUserUid] = true;
    } else {
      updateNote.favoriteBy[this.authService.currentUserUid] = false;
    }

    this.noteService.update(this.note.$key, updateNote);
  }

  showEditDialog(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {note: this.note};
    this.dialog.open(NoteDialogComponent, dialogConfig);
  }

  remove(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      keyToRemove: this.note.$key,
      deleteType: DeleteType.note,
      dialogMsg: 'You cannot undo this!'
    }
    this.dialog.open(DeleteDialogComponent, dialogConfig);
  }

  showMore(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {note: this.note};
    this.dialog.open(NoteDisplayDialogComponent, dialogConfig);
  }

}

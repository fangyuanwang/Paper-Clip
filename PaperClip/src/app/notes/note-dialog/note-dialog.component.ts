import { Component, OnInit, Inject } from '@angular/core';
import { Note } from "app/models/note";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { NoteService } from "app/services/note.service";
import { AuthService } from "app/services/auth.service";

interface NoteDialogData {
  note?: Note;
}

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {
  formNote: Note;
  title = 'Add a new note';

  constructor(private dialogRef: MdDialogRef<NoteDialogComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: NoteDialogData,
    public noteService: NoteService,
    public authService: AuthService) { 
      this.formNote = new Note();
      this.formNote.uid = this.authService.currentUserUid;
    }

  ngOnInit() {
    if (this.dialogData.note) {
      this.title = 'Edit this note';
      this.formNote.setValue(this.dialogData.note);
    }
  }

  onSubmit() {
    try {
      if (this.dialogData.note) {
        this.noteService.update(this.dialogData.note.$key, this.formNote);
      } else {
        this.noteService.add(this.formNote);
      }
      this.dialogRef.close();
    } catch (e) {
      console.log("Submit error", e);
    }
  }

}

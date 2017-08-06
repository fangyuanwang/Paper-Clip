import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { Note } from "app/models/note";
import { AuthService } from "app/services/auth.service";
import { NoteService } from "app/services/note.service";

interface NoteDisplayDialogData {
  note: Note
}

@Component({
  selector: 'app-note-display-dialog',
  templateUrl: './note-display-dialog.component.html',
  styleUrls: ['./note-display-dialog.component.scss']
})
export class NoteDisplayDialogComponent implements OnInit {

  displayNote: Note;

  constructor(private dialogRef: MdDialogRef<NoteDisplayDialogComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: NoteDisplayDialogData,) { }

  ngOnInit() {
    this.displayNote = this.dialogData.note;
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NoteService, NoteRoute } from "app/services/note.service";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { NoteDialogComponent } from "app/notes/note-dialog/note-dialog.component";

@Component({
  selector: 'app-my-note-list',
  templateUrl: './my-note-list.component.html',
  styleUrls: ['./my-note-list.component.scss']
})
export class MyNoteListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public noteService: NoteService,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.noteService.showMyNotesRoute(NoteRoute.mynotes);
  }

  showNoteDialog(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {};
    this.dialog.open(NoteDialogComponent, dialogConfig);
  }
  
  get numColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else {
      return 3;
    } 
  }

}

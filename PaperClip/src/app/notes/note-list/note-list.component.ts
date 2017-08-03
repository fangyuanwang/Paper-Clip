import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NoteService, NoteRoute } from "app/services/note.service";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { NoteDialogComponent } from "app/notes/note-dialog/note-dialog.component";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  title: string;

  constructor(private route: ActivatedRoute,
    public noteService: NoteService,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.route.params.subscribe( (routeParams: Params) => { 
      this.title = routeParams["type"];
     });
   
    this.noteService.showMyNotesRoute(NoteRoute.all);
  }

  ngOnDestroy() {
    this.title = '';
  }

  showNoteDialog(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {firebasePath: this.noteService.notesPath};
    this.dialog.open(NoteDialogComponent, dialogConfig);
  }
}

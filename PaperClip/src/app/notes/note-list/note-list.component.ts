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
    this.route.params.subscribe((routeParams: Params) => {
      this.title = routeParams["type"];
    });

    this.noteService.showMyNotesRoute(NoteRoute.all);
  }
  get numColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else if (window.innerWidth < 1300) {
      return 3;
    } else {
      return 4;
    }
  }

  ngOnDestroy() {
    this.title = '';
  }

}

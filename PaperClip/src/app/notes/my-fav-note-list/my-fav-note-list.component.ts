import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NoteService, NoteRoute } from "app/services/note.service";

@Component({
  selector: 'app-my-fav-note-list',
  templateUrl: './my-fav-note-list.component.html',
  styleUrls: ['./my-fav-note-list.component.scss']
})
export class MyFavNoteListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public noteService: NoteService) { }

  ngOnInit() {

    this.noteService.showMyNotesRoute(NoteRoute.myfavs);
  }

  ngOnDestroy() {
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

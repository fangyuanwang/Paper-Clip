import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NoteService } from "app/services/note.service";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  title: string;

  constructor(private route: ActivatedRoute,
    public noteService: NoteService) { }

  ngOnInit() {
    this.route.params.subscribe( (routeParams: Params) => { 
      this.title = routeParams["type"];
     });
   
    this.noteService.showOnlyMyNotes(false);
  }

  ngOnDestroy() {
    this.title = '';
  }


}

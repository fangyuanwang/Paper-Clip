import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NoteService } from "app/services/note.service";

@Component({
  selector: 'app-my-note-list',
  templateUrl: './my-note-list.component.html',
  styleUrls: ['./my-note-list.component.scss']
})
export class MyNoteListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public noteService: NoteService) { }

  ngOnInit() {
    this.noteService.showOnlyMyNotes(true);
  }

}

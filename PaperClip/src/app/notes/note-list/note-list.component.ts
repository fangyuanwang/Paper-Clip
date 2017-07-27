import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  title: string;
  notes: string[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (routeParams: Params) => { 
      this.title = routeParams["type"];
     });

    this.notes = [this.title, this.title, this.title, this.title];
  }

  ngOnDestroy() {
    this.title = '';
    this.notes = [];
  }


}

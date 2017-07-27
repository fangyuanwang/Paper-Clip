import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Note } from "app/models/note";
import { AuthService } from "app/services/auth.service";

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

  constructor(public authService: AuthService) {
  }

  ngOnInit() {

    if (this.note.uid == this.authService.currentUserUid) {
      this.editingMode = EditMode.displayEditButtons;
    }
  }

  //temporary method for toggle state
  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
  }


}

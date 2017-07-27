import { Component, OnInit, Input, OnDestroy } from '@angular/core';

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
  @Input() noteType: string;
  editingMode = EditMode.notEditable;

  constructor() { 
  }

  ngOnInit() {
    if (this.noteType == 'myfavorites') {
      this.isFavorited = true;
    } else {
      this.isFavorited = false;
    }

    if (this.noteType == 'mynotes') {
      this.editingMode = EditMode.displayEditButtons;
    }
  }

  //temporary method for toggle state
  toggleFavorite(): void{
    this.isFavorited = !this.isFavorited;
  }

}

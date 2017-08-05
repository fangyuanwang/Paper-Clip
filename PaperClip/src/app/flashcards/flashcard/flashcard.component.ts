import { FlashCard } from './../../models/flashcard';
import { Component, OnInit, Input } from '@angular/core';
import { EditMode } from "app/notes/note/note.component";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { DeleteType, DeleteDialogComponent } from "app/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {

  @Input() flashcard: FlashCard;
  editingMode = EditMode.notEditable;

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }


  remove(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      keyToRemove: this.flashcard.$key,
      deleteType: DeleteType.flashcard,
      dialogMsg: 'You cannot undo this! You are deleting a flashcard from this group!'
    }
    this.dialog.open(DeleteDialogComponent, dialogConfig);
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { NoteService } from "app/services/note.service";
import { FlashcardService } from "app/services/flashcard.service";

export enum DeleteType {
  note = 0,
  flashcardGroup = 1,
  flashcard = 2
}

interface DeleteDialogData {
  keyToRemove: string;
  deleteType: DeleteType;
  dialogMsg: string;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  dialogMsg: string;
  deleteType: DeleteType;
  keyToRemove: string;

  constructor(private dialogRef: MdDialogRef<DeleteDialogComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: DeleteDialogData,
    public noteService: NoteService,
    public flashcardService: FlashcardService) { 

    }

  ngOnInit() {
    this.deleteType = this.dialogData.deleteType;
    this.keyToRemove = this.dialogData.keyToRemove;
    this.dialogMsg = this.dialogData.dialogMsg;
  }

  delete(): void {
    if (this.deleteType == 0) {
      this.noteService.remove(this.keyToRemove);
    } else if (this.deleteType == 1) {
      this.flashcardService.removeGroup(this.keyToRemove);
    } else {
      this.flashcardService.removeFlashcard(this.keyToRemove);
    }

    this.dialogRef.close();
  }
}

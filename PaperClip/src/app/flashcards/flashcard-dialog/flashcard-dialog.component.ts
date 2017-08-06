import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { FlashCard } from "app/models/flashcard";
import { FlashcardService } from "app/services/flashcard.service";
import { AuthService } from "app/services/auth.service";

export interface FlashcardDialogData {
  flashcard?: FlashCard,
  groupKey: string;
}

@Component({
  selector: 'app-flashcard-dialog',
  templateUrl: './flashcard-dialog.component.html',
  styleUrls: ['./flashcard-dialog.component.scss']
})
export class FlashcardDialogComponent implements OnInit {

  title = "Add a new flashcard";
  formFlashcard: FlashCard;

  constructor(private dialogRef: MdDialogRef<FlashcardDialogComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: FlashcardDialogData,
    public flashcardService: FlashcardService,
    public authService: AuthService) { 
      this.formFlashcard = new FlashCard();
      this.formFlashcard.uid = this.authService.currentUserUid;
    }

  ngOnInit() {
    if (this.dialogData.flashcard) {
      this.title = 'Edit this flashcard';
      this.formFlashcard.setValue(this.dialogData.flashcard);
    }
  }

  onSubmit() {
    try {
      if (this.dialogData.flashcard) {
        this.flashcardService.updateFlashcard(this.dialogData.flashcard.$key, this.formFlashcard);
      } else {
        this.formFlashcard.groupKey = this.dialogData.groupKey;
        this.flashcardService.addFlashcard(this.formFlashcard);
      }
      this.dialogRef.close();
    } catch (e) {
      console.log("Submit error", e);
    }
  }

}

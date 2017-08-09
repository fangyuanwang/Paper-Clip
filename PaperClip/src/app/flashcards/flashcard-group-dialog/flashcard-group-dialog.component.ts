import { AuthService } from './../../services/auth.service';
import { FlashcardService } from 'app/services/flashcard.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FlashCardGroup } from './../../models/flashcard-group';
import { Component, OnInit, Inject } from '@angular/core';
interface FlashcardGroupDialogData {
  flashcardGroup?: FlashCardGroup;
}

@Component({
  selector: 'app-flashcard-group-dialog',
  templateUrl: './flashcard-group-dialog.component.html',
  styleUrls: ['./flashcard-group-dialog.component.scss']
})
export class FlashcardGroupDialogComponent implements OnInit {
  formFlashcardGroup: FlashCardGroup;
  title = "Add a new flashcard group";
  constructor(
    private dialogRef: MdDialogRef<FlashcardGroupDialogComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: FlashcardGroupDialogData,
    public flashcardService: FlashcardService,
    public authService: AuthService
  ) {
    this.formFlashcardGroup = new FlashCardGroup();
    this.formFlashcardGroup.uid = this.authService.currentUserUid;
  }

  ngOnInit() {
    if (this.dialogData.flashcardGroup) {
      this.title = 'Edit this flashcard group';
      this.formFlashcardGroup.setValue(this.dialogData.flashcardGroup);
    }
  }
  onSubmit() {
    try {
      if (this.dialogData.flashcardGroup) {
        this.flashcardService.updateGroup(this.dialogData.flashcardGroup.$key, this.formFlashcardGroup);
      } else {
        this.flashcardService.addGroup(this.formFlashcardGroup);
      }
      this.dialogRef.close();
    } catch (e) {
      console.log("Submit error", e);
    }
  }

}

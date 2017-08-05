import { AuthService } from './../../services/auth.service';
import { FlashCardGroup } from './../../models/flashcard-group';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashCard } from './../../models/flashcard';
import { EditMode } from 'app/notes/note/note.component';
import { Component, OnInit, Input } from '@angular/core';
import { FlashcardService } from "app/services/flashcard.service";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { FlashcardDialogComponent } from "app/flashcards/flashcard-dialog/flashcard-dialog.component";
import { DeleteType, DeleteDialogComponent } from "app/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-flashcard-group',
  templateUrl: './flashcard-group.component.html',
  styleUrls: ['./flashcard-group.component.scss']
})
export class FlashcardGroupComponent implements OnInit {

  flashcardKey: string;
  @Input() flashcardGroup: FlashCardGroup;
  editingMode = EditMode.notEditable;
  isFavorited: boolean;

  constructor(public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public flashcardService: FlashcardService,
    private dialog: MdDialog) {

  }

  ngOnInit() {
    if (this.flashcardGroup.uid == this.authService.currentUserUid) {
      this.editingMode = EditMode.displayEditButtons;
    }
    if (this.flashcardGroup.favoriteBy && this.flashcardGroup.favoriteBy[this.authService.currentUserUid]) {
      this.isFavorited = true;
    } else {
      this.isFavorited = false;
    }
    if (this.flashcardGroup.favoriteBy == undefined) {
      this.flashcardGroup.favoriteBy = {};
    }
  }

  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    var updateGroup = new FlashCardGroup();
    updateGroup.setValue(this.flashcardGroup);
    if (this.isFavorited) {
      updateGroup.favoriteBy[this.authService.currentUserUid] = true;
    } else {
      updateGroup.favoriteBy[this.authService.currentUserUid] = false;
    }

    this.flashcardService.updateGroup(this.flashcardGroup.$key, updateGroup);
  }

  showEditDialog(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {flashcardGroup: this.flashcardGroup};
    this.dialog.open(FlashcardDialogComponent, dialogConfig);
  }

  remove(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      keyToRemove: this.flashcardGroup.$key,
      deleteType: DeleteType.flashcardGroup,
      dialogMsg: 'You cannot undo this! You will lose all flashcards that belong to this!'
    }
    this.dialog.open(DeleteDialogComponent, dialogConfig);
  }
}

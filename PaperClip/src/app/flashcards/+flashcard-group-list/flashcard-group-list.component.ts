import { FlashcardService, FlashcardGroupRoute } from 'app/services/flashcard.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditMode } from 'app/notes/note/note.component';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { AuthService } from "app/services/auth.service";
import { FlashCardGroup } from "app/models/flashcard-group";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { FlashcardDialogComponent } from "app/flashcards/flashcard-dialog/flashcard-dialog.component";
import { FlashcardGroupDialogComponent } from "app/flashcards/flashcard-group-dialog/flashcard-group-dialog.component";

@Component({
  selector: 'app-flashcard-group-list',
  templateUrl: './flashcard-group-list.component.html',
  styleUrls: ['./flashcard-group-list.component.scss']
})
export class FlashcardGroupListComponent implements OnInit {
  groupKey: string;
  flashcardGroup: FlashCardGroup;
  isFavorited: boolean;
  previousRoute: string;

  constructor(private route: ActivatedRoute,
    public flashcardService: FlashcardService,
    public db: AngularFireDatabase,
    public authService: AuthService,
    private dialog: MdDialog,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.filter((params) => params.previous)
      .subscribe((params) => {
        this.previousRoute = params.previous;
      });

    this.route.params.subscribe((routeParams: Params) => {
      const groupKey = routeParams["groupKey"];
      this.groupKey = groupKey;
    });

    this.flashcardGroup = new FlashCardGroup();
    this.flashcardGroup.$key = this.groupKey;

    firebase.database().ref(`flashcards-group/${this.groupKey}/title`).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this.flashcardGroup.title = snapshot.val();
      });

    firebase.database().ref(`flashcards-group/${this.groupKey}/desc`).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this.flashcardGroup.desc = snapshot.val();
      });

    firebase.database().ref(`flashcards-group/${this.groupKey}/uid`).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this.flashcardGroup.uid = snapshot.val();
      });

    firebase.database().ref(`flashcards-group/${this.groupKey}/favoriteBy`).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        if (snapshot.val()) {
          this.flashcardGroup.favoriteBy = snapshot.val();
        } else {
          this.flashcardGroup.favoriteBy = {};
        }
      });

    if (this.flashcardGroup.favoriteBy && this.flashcardGroup.favoriteBy[this.authService.currentUserUid]) {
      this.isFavorited = true;
    } else {
      this.isFavorited = false;
    }

    this.flashcardService.showFlashcardByGroupKey(this.groupKey);
  }
  get numColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else if (window.innerWidth < 1300) {
      return 3;
    } else {
      return 4;
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
    dialogConfig.data = { flashcardGroup: this.flashcardGroup };
    this.dialog.open(FlashcardGroupDialogComponent, dialogConfig);
  }

  addFlashcard(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = { groupKey: this.groupKey };
    this.dialog.open(FlashcardDialogComponent, dialogConfig);
  }

  back(): void {
    this.router.navigate([`/flashcard-list/${this.previousRoute}`])
  }

}

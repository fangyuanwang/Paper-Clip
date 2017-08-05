import { FlashCardGroup } from './../models/flashcard-group';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { FlashCard } from "app/models/flashcard";
import { Observable } from "rxjs/Observable";
import { AuthService } from "app/services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Query } from "angularfire2/interfaces";
import * as firebase from 'firebase/app';


export enum FlashcardGroupRoute {
  all = 0,
  myflashcards = 1,
  myfavs = 2,
}


@Injectable()
export class FlashcardService {
  readonly flashcardsGroupPath = "flashcards-group";
  readonly flashcardsPath = "flashcards";
  public myFlashcardsGroupRouteStream: Subject<FlashcardGroupRoute>;
  public flashcardGroupStream: Observable<FlashCardGroup[]>;
  public flashcardStream: Observable<FlashCard[]>;
  public myFlashcardsStream: Subject<String>;

  constructor(private db: AngularFireDatabase,
    public authService: AuthService) {
    this.myFlashcardsGroupRouteStream = new BehaviorSubject<FlashcardGroupRoute>(FlashcardGroupRoute.all);

    const queryGroupStream: Observable<Query> = Observable.combineLatest<Query>(
      this.myFlashcardsGroupRouteStream,
      (myFlashcardsRoute: FlashcardGroupRoute) => {
        if (myFlashcardsRoute == FlashcardGroupRoute.myflashcards) {
          return {
            orderByChild: 'uid',
            equalTo: this.authService.currentUserUid,
          };
        } else if (myFlashcardsRoute == FlashcardGroupRoute.myfavs) {
          return {
            orderByChild: `favoriteBy/${this.authService.currentUserUid}`,
            equalTo: true,
          };
        } else {
          return {
            orderByKey: true
          };
        }
      }
    );
    this.flashcardGroupStream = queryGroupStream
      .switchMap<Query, FlashCardGroup[]>((queryPara: Query) => {
        return this.db.list(this.flashcardsGroupPath, { query: queryPara });
      });

    
    //flashcards
    this.myFlashcardsStream = new BehaviorSubject<String>("");

    const queryStream: Observable<Query> = Observable.combineLatest<Query>(
      this.myFlashcardsStream,
      (myFlashcardKey: String) => {
        if (myFlashcardKey != "") {
          return {
            orderByChild: "groupKey",
            equalTo: myFlashcardKey
          };
        }
      }
    );
    this.flashcardStream = queryStream
      .switchMap<Query, FlashCard[]>((queryPara: Query) => {
        return this.db.list(this.flashcardsPath, { query: queryPara });
      });
  }

  showMyFlashcardGroupRoute(route: FlashcardGroupRoute): void {
    this.myFlashcardsGroupRouteStream.next(route);
  }
  updateGroup(key: string, flashcards: FlashCardGroup): void {
    firebase.database().ref().child(this.flashcardsGroupPath).child(key).set(flashcards);
  }

  addGroup(flashcards: FlashCardGroup): void {
    firebase.database().ref().child(this.flashcardsGroupPath).push(flashcards);
  }

  removeGroup(keyToRemove: string): void {
    firebase.database().ref().child(this.flashcardsGroupPath).child(keyToRemove).remove();
  }

  addFlashcard(key: string, flashcard: FlashCard): void {
    firebase.database().ref().child(this.flashcardsPath).child(key).set(flashcard);
  }
  updateFlashcard(key: string, flashcard: FlashCard): void {
    firebase.database().ref().child(this.flashcardsPath).child(key).set(flashcard);
  }

  removeFlashcard(keyToRemove: string): void {
    firebase.database().ref().child(this.flashcardsPath).child(keyToRemove).remove();
  }



}

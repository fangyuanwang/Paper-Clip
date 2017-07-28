import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { FlashCard } from "app/models/flashcard";
import { Observable } from "rxjs/Observable";
import { AuthService } from "app/services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Query } from "angularfire2/interfaces";


export enum FlashcardRoute {
  all = 0,
  myflashcards = 1,
  myfavs = 2,
}

@Injectable()
export class FlashcardService {
  readonly flashcardsPath = "flashcards";
  public myFlashcardsRouteStream: Subject<FlashcardRoute>;
  public flashcardStream: Observable<FlashCard[]>;
  
  constructor(private db: AngularFireDatabase,
    public authService: AuthService) {
      this.myFlashcardsRouteStream = new BehaviorSubject<FlashcardRoute>(FlashcardRoute.all);

      const queryStream: Observable<Query> = Observable.combineLatest<Query>(
      this.myFlashcardsRouteStream,
       (myNotesRoute: FlashcardRoute) => { 
         if (myNotesRoute == FlashcardRoute.myflashcards) {
          return {
            orderByChild: 'uid',
            equalTo: this.authService.currentUserUid,
          };
         } else if (myNotesRoute == FlashcardRoute.myfavs) {
          return {
            orderByChild: 'favoriteBy',
            equalTo: this.authService.currentUserUid,
          };
         } else {
          return {
            orderByKey: true
          };
         }     
       }
    );
    this.flashcardStream = queryStream
      .switchMap<Query, FlashCard[]>( (queryPara: Query) => { 
        return this.db.list(this.flashcardsPath, {query: queryPara});
     });
  }

  showMyFlashcardsRoute(route: FlashcardRoute): void {
    this.myFlashcardsRouteStream.next(route);
  }

     

}

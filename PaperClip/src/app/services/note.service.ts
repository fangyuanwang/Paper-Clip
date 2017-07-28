import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/services/auth.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Note } from "app/models/note";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import { Query } from "angularfire2/interfaces";
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

export enum NoteRoute {
  all = 0,
  mynotes = 1,
  myfavs = 2,
}

@Injectable()
export class NoteService {
  readonly notesPath = "notes";
  public myNotesRouteStream: Subject<NoteRoute>;
  public notesStream: Observable<Note[]>;

  constructor(private db: AngularFireDatabase,
    public authService: AuthService) { 
      this.myNotesRouteStream = new BehaviorSubject<NoteRoute>(NoteRoute.all);

      const queryStream: Observable<Query> = Observable.combineLatest<Query>(
      this.myNotesRouteStream,
       (myNotesRoute: NoteRoute) => { 
         if (myNotesRoute == NoteRoute.mynotes) {
          return {
            orderByChild: 'uid',
            equalTo: this.authService.currentUserUid,
          };
         } else if (myNotesRoute == NoteRoute.myfavs) {
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
    this.notesStream = queryStream
      .switchMap<Query, Note[]>( (queryPara: Query) => { 
        return this.db.list(this.notesPath, {query: queryPara});
     });
  }

  showMyNotesRoute(route: NoteRoute): void {
    this.myNotesRouteStream.next(route);
  }

  update(key: string, note: Note):void  {
    firebase.database().ref().child(this.notesPath).child(key).set(note);
  }

}

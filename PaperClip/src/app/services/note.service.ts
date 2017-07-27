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

@Injectable()
export class NoteService {
  readonly notesPath = "notes";
  public isMyNotesPageStream: Subject<boolean>;
  public notesStream: Observable<Note[]>;

  constructor(private db: AngularFireDatabase,
    public authService: AuthService) { 
      this.isMyNotesPageStream = new BehaviorSubject<boolean>(false);

      const queryStream: Observable<Query> = Observable.combineLatest<Query>(
      this.isMyNotesPageStream,
       (isMyNotesPage: boolean) => { 
         if (isMyNotesPage) {
          return {
            orderByChild: 'uid',
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

  showOnlyMyNotes(isMyNotesPage: boolean): void {
    this.isMyNotesPageStream.next(isMyNotesPage);
  }

}

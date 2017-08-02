import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { MainComponent } from './+main/main.component';
import { SignInComponent } from './+sign-in/sign-in.component';
import { AuthGuard } from "app/services/auth.guard";
import { AuthService } from "app/services/auth.service";
import { NoteComponent } from './notes/note/note.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { FlashcardComponent } from './flashcards/flashcard/flashcard.component';
import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { FlashcardService } from "app/services/flashcard.service";
import { NoteService } from "app/services/note.service";
import { MyNoteListComponent } from './notes/my-note-list/my-note-list.component';
import { MyFavNoteListComponent } from './notes/my-fav-note-list/my-fav-note-list.component';
import { MyFlashcardListComponent } from './flashcards/my-flashcard-list/my-flashcard-list.component';
import { MyFavFlashcardListComponent } from './flashcards/my-fav-flashcard-list/my-fav-flashcard-list.component';
import { FlashcardGroupComponent } from './flashcards/flashcard-group/flashcard-group.component';
import { FlashcardGroupListComponent } from './+flashcard-group-list/flashcard-group-list.component';

export const MaterialModules = [
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    NoteComponent,
    NoteListComponent,
    FlashcardComponent,
    FlashcardListComponent,
    MyNoteListComponent,
    MyFavNoteListComponent,
    MyFlashcardListComponent,
    MyFavFlashcardListComponent,
    FlashcardGroupComponent,
    FlashcardGroupListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModules,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    FlashcardService,
    NoteService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

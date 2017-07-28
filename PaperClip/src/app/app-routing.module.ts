import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "app/+main/main.component";
import { SignInComponent } from "app/+sign-in/sign-in.component";
import { AuthGuard } from "app/services/auth.guard";
import { MyNoteListComponent } from "app/notes/my-note-list/my-note-list.component";
import { MyFavNoteListComponent } from "app/notes/my-fav-note-list/my-fav-note-list.component";
import { MyFlashcardListComponent } from "app/flashcards/my-flashcard-list/my-flashcard-list.component";
import { MyFavFlashcardListComponent } from "app/flashcards/my-fav-flashcard-list/my-fav-flashcard-list.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'signin', pathMatch: 'full', component: SignInComponent },
  { path: 'note-list/mynotes', component:MyNoteListComponent, canActivate: [AuthGuard]},
  { path: 'note-list/myfavorites', component:MyFavNoteListComponent, canActivate: [AuthGuard]},
  { path: 'note-list/all', component:NoteListComponent, canActivate: [AuthGuard]},
  { path: 'flashcard-list/all', component:FlashcardListComponent, canActivate: [AuthGuard]},
  { path: 'flashcard-list/myflashcards', component:MyFlashcardListComponent, canActivate: [AuthGuard]},
  { path: 'flashcard-list/myfavorites', component:MyFavFlashcardListComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

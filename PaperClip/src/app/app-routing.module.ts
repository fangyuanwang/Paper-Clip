import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "app/+main/main.component";
import { SignInComponent } from "app/+sign-in/sign-in.component";
import { AuthGuard } from "app/services/auth.guard";
import { MyNoteListComponent } from "app/notes/my-note-list/my-note-list.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'signin', pathMatch: 'full', component: SignInComponent },
  { path: 'note-list/mynotes', component:MyNoteListComponent, canActivate: [AuthGuard]},
  { path: 'note-list/:type', component:NoteListComponent, canActivate: [AuthGuard]},
  { path: 'flashcard-list/:type', component:FlashcardListComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

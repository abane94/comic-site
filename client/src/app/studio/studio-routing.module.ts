import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioHomeComponent } from './studio-home/studio-home.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
    { path: '', component: StudioHomeComponent },
    { path: 'book', component: BookEditorComponent },
    { path: 'book/:id', component: BookEditorComponent },
    { path: 'books', component: BookListComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class StudioRoutingModule {}

// Example paths
// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// { path: 'dashboard',  component: DashboardComponent },
// { path: 'detail/:id', component: HeroDetailComponent },
// { path: 'heroes',     component: HeroesComponent }

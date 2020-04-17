import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioHomeComponent } from './studio-home/studio-home.component';

const routes: Routes = [
    { path: '', component: StudioHomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class StudioRoutingModule {}

// Example paths
// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// { path: 'dashboard',  component: DashboardComponent },
// { path: 'detail/:id', component: HeroDetailComponent },
// { path: 'heroes',     component: HeroesComponent }

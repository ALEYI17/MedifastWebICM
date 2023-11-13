import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Doctor/auth/auth.component';

const routes: Routes = [
  { path: 'registrar', component: AuthComponent },
  { path: '', pathMatch: 'full', redirectTo: 'registrar'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

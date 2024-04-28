import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component'
 
const routes: Routes = [
{path:'home',redirectTo:'/',pathMatch:'full'},
{path:'**',component:PagenotfoundComponent}
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

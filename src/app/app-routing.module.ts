import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlaygroundComponent} from './playground/playground.component';
import {SearchComponent} from './search/search.component';
import {ResourceComponent} from './resource/resource.component';


const routes: Routes = [
  {
    path: 'resource/:iri',
    component: ResourceComponent
  },
  {
    path: '**',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

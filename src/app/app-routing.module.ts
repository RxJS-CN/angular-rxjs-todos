import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: ':status', component: TodosComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

export const routedComponents = [ TodosComponent ];

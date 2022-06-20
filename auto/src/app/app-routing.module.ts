import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'questions',
      },
      {
        path: 'questions',
        loadChildren: () => import('./modules/question/questions.module').then(m => m.QuestionsModule)
      },
      {
        path: 'legislation',
        loadChildren: () => import ('./modules/legislation/legislation.module').then(m => m.LegislationModule)
      },
      {
        path: 'test',
        loadChildren: () => import ('./modules/test/test.module').then(m => m.TestModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

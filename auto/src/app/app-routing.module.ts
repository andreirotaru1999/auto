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
      },
      {
        path: 'login',
        loadChildren: () => import ('./modules/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import ('./modules/register/register.module').then(m => m.RegisterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

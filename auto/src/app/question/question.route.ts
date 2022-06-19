import { Routes } from '@angular/router';
import { QuestionComponent} from "./question.component";
import {QuestionEditComponent} from "./question-edit/question-edit.component";
import {QuestionDetailsComponent} from "../question-details/question-details.component";
import {HomeComponent} from "../home/home.component";
import {TestComponent} from "../test/test.component";
import {LegislationComponent} from "../legislation/legislation.component";

export const questionRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'question',
    component: QuestionComponent,
  },

  {
    path: 'legislation',
    component: LegislationComponent,
  },

  {
    path: 'test',
    component: TestComponent,
  },

  {
    path: 'question/new',
    component: QuestionEditComponent,
  },

  {
    path: 'question/:id/view',
    component: QuestionDetailsComponent,
  },

  {
    path: 'question/:id/edit',
    component: QuestionEditComponent,
  },

]



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent} from "./components/question/question.component";
import { QuestionEditComponent } from "./components/question-edit/question-edit.component";
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent,
  },

  {
    path: 'new',
    component: QuestionEditComponent,
  },

  {
    path: ':id/view',
    component: QuestionDetailsComponent,
  },

  {
    path: ':id/edit',
    component: QuestionEditComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}



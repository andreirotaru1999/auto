import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { QuestionComponent } from './components/question/question.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { QuestionEditComponent } from './components/question-edit/question-edit.component';
import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
  imports: [
    SharedModule,
    QuestionsRoutingModule
  ],
  declarations: [
    QuestionComponent,
    QuestionDetailsComponent,
    QuestionEditComponent
  ],
  providers: []
})

export class QuestionsModule {}

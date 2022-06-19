import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule} from "./app-routing.module";
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { questionRoute } from "./question/question.route";
import {RouterModule} from "@angular/router";
import { QuestionEditComponent } from './question/question-edit/question-edit.component';
import  {HttpClientModule } from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { LegislationComponent } from './legislation/legislation.component';


const questionRoutes = [...questionRoute];

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionEditComponent,
    QuestionDetailsComponent,
    HomeComponent,
    TestComponent,
    LegislationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(questionRoute),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

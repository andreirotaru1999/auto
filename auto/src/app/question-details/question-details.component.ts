import { Component, OnInit } from '@angular/core';
import { QuestionService } from "../question/question.service";
import { ActivatedRoute } from "@angular/router";
import {Question} from "../question/question.model";

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  question: Question;
  constructor(protected  activatedRoute: ActivatedRoute,
              private questionService:QuestionService) { }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params['id'];
    this.questionService.find(id).subscribe(
      (rez: Question) => this.question = rez
    );
  }

}

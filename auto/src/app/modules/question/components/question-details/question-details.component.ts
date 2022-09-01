import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../../core/services/data/question.service';
import { ActivatedRoute } from "@angular/router";
import { Question } from '../../../../core/models/question.model';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  question: Question;
  correctAnswers;
  constructor(protected  activatedRoute: ActivatedRoute,
              private questionService:QuestionService) { }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params['id'];
    this.questionService.find(id).subscribe(
      (rez: Question) => {
        this.question = rez;
        this.correctAnswers = this.question.correctAnswer.toString();
      }
    );
  }

}

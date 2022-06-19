import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../question.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Question} from "../question.model";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  question: Question = {};

  constructor(private questionService:QuestionService,
              protected  activatedRoute: ActivatedRoute) { }

  createQuestion(form: NgForm){
    let id: number = this.activatedRoute.snapshot.params['id'];
    if(id){
      form.value.id = Number(id);
      this.questionService.edit(id, form.value).subscribe();
    }
    else{
      this.questionService.createQuestion(form.value).subscribe();
    }

  }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.questionService.find(id).subscribe(
        (rez: Question) => this.question = rez
      );
    }
  }



}

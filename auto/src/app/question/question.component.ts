import { Component, OnInit } from '@angular/core';
import { QuestionService} from "./question.service";
import { Question} from "./question.model";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions:Question [] = [];

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(question => this.questions = question);
  }

  deleteQuestion(id: string) {
    if(!id){
      console.log("There is no question to delete")
    }
    else{
      if(confirm("Are you sure to delete this article?")) {
        this.questionService.delete(id).subscribe();
        this.ngOnInit();
      };
    }
  }

}

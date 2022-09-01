import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TestService} from "../../../../core/services/data/test.service";
import { Test } from 'src/app/core/models/test.model';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements  OnInit, OnDestroy {

  private subscription: Subscription;
  public currentPage = 0;
  public test:Test;
  public dateNow = new Date();
  public dDay = this.addHours();
  milliSecondsInASecond = 1000;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;
  public remainingQuestions;
  public numberOfCorrectAnswers = 0;
  public numberOfWrongAnswers = 0;
  public selectedAnswers = [];
  public currentAnswer = [false,false,false]
  public view = false;
  public finish = false;
  public timeDifference;
  public remainingSeconds;
  public remainingMinutes;
  public delayedQuestions = [];
  public style = ['white','white', 'white'];

  constructor(protected  activatedRoute: ActivatedRoute,
              private testService:TestService) { }

  private getTimeDifference () {
    this.timeDifference = this.dDay.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
    this.remainingSeconds = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.remainingMinutes = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    if(this.remainingSeconds === 0 && this.remainingMinutes === 0) {
      this.finish = true;
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(() => { this.getTimeDifference(); });
    this.testService.generateTest(26).subscribe(
      (rez) => {
        this.test = rez
        this.remainingQuestions = this.test.questions.length
      }

    );
  }

  answerQuestion() {
    this.selectedAnswers[this.currentPage] = "";
    if (this.currentAnswer[0]) {
      this.selectedAnswers[this.currentPage] += '1'
    }
    if (this.currentAnswer[1]) {
      this.selectedAnswers[this.currentPage] += '2'
    }
    if (this.currentAnswer[2]) {
      this.selectedAnswers[this.currentPage] += '3'
    }
    if (this.currentPage < this.test.questions.length) {
      if (this.selectedAnswers[this.currentPage] === this.test.questions[this.currentPage].correctAnswer.toString()) {
        this.numberOfCorrectAnswers++;
      } else {
        this.numberOfWrongAnswers++;
      }
    }
    if(this.numberOfWrongAnswers === 5) {
      this.finish = true;
      this.subscription.unsubscribe();
    }
    this.currentAnswer[0] = false;
    this.currentAnswer[1] = false;
    this.currentAnswer[2] = false;
    this.remainingQuestions--;

    if(this.remainingQuestions - this.delayedQuestions.length === 0 && this.remainingQuestions !== 0) {
      this.currentPage = this.delayedQuestions[0];
      this.delayedQuestions.splice(0,1);
    } else if(this.currentPage<9 && this.remainingQuestions !== 0){
      this.currentPage++;
    }

    if (this.remainingQuestions === 0) {
      this.finish = true;
    }
  }

  changeAnswer(i) {
    this.currentAnswer[i] = !this.currentAnswer[i];
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addHours( date = new Date()) {
    date.setTime(date.getTime() + 30 * 60 * 1000);
    return date;
  }
  delayQuestion(){
    this.delayedQuestions.push(this.currentPage);
    this.currentPage++;
    this.currentAnswer[0] = false;
    this.currentAnswer[1] = false;
    this.currentAnswer[2] = false;
  }
  showAnswers() {
    this.finish = false
    this.currentPage = 0;
    this.answerStatus()
    this.view = true;
  }
  showNext() {
    this.currentAnswer[0] = false;
    this.currentAnswer[1] = false;
    this.currentAnswer[2] = false;
    this.currentPage++;
    this.answerStatus()
  }
  showPrevious() {
    this.currentAnswer[0] = false;
    this.currentAnswer[1] = false;
    this.currentAnswer[2] = false;
    this.currentPage=this.currentPage-1
    this.answerStatus()
  }
  answerStatus() {
    this.style[0] = 'white';
    this.style[1] = 'white';
    this.style[2] = 'white';
    for(let i = 0; i<=2; i++) {
      if(this.selectedAnswers[this.currentPage]) {
        if(this.selectedAnswers[this.currentPage].includes((i+1).toString())){
          this.currentAnswer[i] = true;
          if (!this.test.questions[this.currentPage].correctAnswer.toString().includes((1+ i).toString())) {
            this.style[i] = 'red';
          }
        }
      }
      if (this.test.questions[this.currentPage].correctAnswer.toString().includes((1 + i).toString())) {
        this.style[i] = 'LightGreen';
      }
    }
  }
  saveTest() {
    console.log(this.test);
    this.test.score = this.numberOfCorrectAnswers;
    this.testService.saveTest(this.test).subscribe((rez)=> { 
      console.log(rez);
    });
  }


}

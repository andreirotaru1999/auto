import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TestService} from "../../../../core/services/data/test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements  OnInit, OnDestroy {

  private subscription: Subscription;
  public currentPage = 0;
  public test:any = [];
  public dateNow = new Date();
  public dDay = this.addHours();
  milliSecondsInASecond = 1000;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;
  public remainingQuestions;
  public numberOfCorrectAnswers = 0;
  public numberOfWrongAnswers = 0;
  public selectedAnswers = [];
  public currentAnswer = {
    answer1: false,
    answer2: false,
    answer3: false
  }
  public show = false;
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
    this.testService.generateTest().subscribe(
      (rez) => {
        this.test = rez
        this.remainingQuestions = this.test.question.length
      }

    );
  }

  answerQuestion() {
    this.selectedAnswers[this.currentPage] = "";
    if (this.currentAnswer.answer1) {
      this.selectedAnswers[this.currentPage] += '1'
    }
    if (this.currentAnswer.answer2) {
      this.selectedAnswers[this.currentPage] += '2'
    }
    if (this.currentAnswer.answer3) {
      this.selectedAnswers[this.currentPage] += '3'
    }
    if (this.currentPage < this.test.question.length) {
      if (this.selectedAnswers[this.currentPage] === this.test.question[this.currentPage].correctAnswer.toString()) {
        this.numberOfCorrectAnswers++;
      } else {
        this.numberOfWrongAnswers++;
      }
    }
    // if(this.wrongAnswers === 5) {
    //   this.finish = true;
    // }
    this.currentAnswer.answer1 = false;
    this.currentAnswer.answer2 = false;
    this.currentAnswer.answer3 = false;
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
    if(i === 1) {
      this.currentAnswer.answer1 = !this.currentAnswer.answer1;
    }
    if(i === 2) {
      this.currentAnswer.answer2 = !this.currentAnswer.answer2;
    }
    if(i === 3) {
      this.currentAnswer.answer3 = !this.currentAnswer.answer3;
    }
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
    this.currentAnswer.answer1 = false;
    this.currentAnswer.answer2 = false;
    this.currentAnswer.answer3 = false;
  }
  showAnswers() {
    this.finish = false
    this.currentPage = 0;
    this.answerStatus()
    this.show = true;
  }
  showNext() {
    this.currentAnswer.answer1 = false;
    this.currentAnswer.answer2 = false;
    this.currentAnswer.answer3 = false;
    this.currentPage=this.currentPage+1
    this.answerStatus()
  }
  showPrevious() {
    this.currentAnswer.answer1 = false;
    this.currentAnswer.answer2 = false;
    this.currentAnswer.answer3 = false;
    this.currentPage=this.currentPage-1
    this.answerStatus()
  }
  answerStatus() {
    this.style[0] = 'white';
    this.style[1] = 'white';
    this.style[2] = 'white';
    if(this.selectedAnswers[this.currentPage].includes('1')){
      this.currentAnswer.answer1 = true;
      if (!this.test.question[this.currentPage].correctAnswer.toString().includes('1')) {
        this.style[0] = 'red';
      }
    }
    if(this.selectedAnswers[this.currentPage].includes('2')){
      this.currentAnswer.answer2 = true;
      if (!this.test.question[this.currentPage].correctAnswer.toString().includes('2')) {
        this.style[1] = 'red';
      }
    }
    if(this.selectedAnswers[this.currentPage].includes('3')){
      this.currentAnswer.answer3 = true;
      if (!this.test.question[this.currentPage].correctAnswer.toString().includes('3')) {
        this.style[2] = 'red';
      }
    }
    if (this.test.question[this.currentPage].correctAnswer.toString().includes('1')) {
      this.style[0] = 'green';
    }
    if (this.test.question[this.currentPage].correctAnswer.toString().includes('2')) {
      this.style[1] = 'green';
    }
    if (this.test.question[this.currentPage].correctAnswer.toString().includes('3')) {
      this.style[2] = 'green';
    }
  }



}

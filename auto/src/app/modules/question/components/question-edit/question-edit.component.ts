import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../../../core/services/data/question.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Question} from "../../../../core/models/question.model";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  question: Question = {};
  file: File;

  constructor(private questionService:QuestionService,
              protected  activatedRoute: ActivatedRoute) { }

  createQuestion(form: NgForm){
    let id: number = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.questionService.edit(id, this.toFormData(form.value)).subscribe();
    }
    else{
      this.questionService.createQuestion(this.toFormData(form.value)).subscribe();
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

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.productForm.patchValue({
        //   picture: file
        // });
        this.file = file;
      };
    }
  }
  public toFormData<T>( formValue: T ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }

    if (this.file) {
      formData.append('image', this.file);
    } else {
      formData.delete('image');
    }

    return formData;
  }

}

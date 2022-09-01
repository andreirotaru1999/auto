import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService} from "../../../../core/services/data/question.service";
import { Question} from "../../../../core/models/question.model";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  questions:Question [] = [];
  public dataSource: MatTableDataSource<Question>;
  public displayedColumns = ['text', 'actions'];
  
  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions
      this.dataSource = new MatTableDataSource<Question>(questions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteQuestion(id: string) {
    if(!id){
      console.log("There is no question to delete")
    }
    else{
      if(confirm("Are you sure to delete this article?")) {
        this.questionService.delete(id).subscribe(() => {
            this.getQuestions()
          }
        );
      }
    }
  }

}

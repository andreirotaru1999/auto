import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from "../../models/question.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/question`);
  }
  public createQuestion(question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/question/new`, question);
  }
  public find(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/question/${id}`);
  }
  public edit(id: number, question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/question/${id}/edit`, question);
  }
  public delete(id:string):Observable<Question> {
    return this.http.delete<Question>(`${this.apiUrl}/question/${id}`);
  }
}

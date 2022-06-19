import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from "./test.model";
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  public generateTest(number): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/test`);
  }
  public createTest(test:Test): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/test/new`, test);
  }
  public findTest(id: string): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/test/${id}`);
  }
  public editTest(id: number, test:Test): Observable<Test> {
    return this.http.put<Test>(`${this.apiUrl}/test/${id}/edit`, test);
  }
  public deleteTest(id:string):Observable<Test> {
    return this.http.delete<Test>(`${this.apiUrl}/test/${id}`);
  }
}

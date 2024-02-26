import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../Models/Quiz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8083/hrmaps/quiz'; 

  constructor(private http: HttpClient) { }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

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

  addQuiz(quiz: Quiz, sessionId: number): Observable<Quiz> {
    // Ajoutez l'ID de la session dans le corps de la requête
    return this.http.post<Quiz>(`${this.apiUrl}?sessionId=${sessionId}`, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

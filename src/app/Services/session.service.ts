import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../Models/Session';
import { User } from '../Models/User';


@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  
  private apiUrl = 'http://localhost:8083/hrmaps/api/sessions';
  private showUsers = 'http://localhost:8083/hrmaps/api/users';
  private quizSessionUrl ='http://localhost:8083/hrmaps/quiz/sessions'; 
  constructor(private http: HttpClient) { }

  getQuizzesBySession(sessionId: number): Observable<any> {
    const url = `${this.quizSessionUrl}/${sessionId}/quizzes`; // Assuming your Spring backend provides an endpoint like this
    return this.http.get<any>(url);
  }
  getSessions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getSessionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createSession(session: Session, idFormation: number): Observable<Session> {
    const url = `${this.apiUrl}?idFormation=${idFormation}`;
    return this.http.post<Session>(url, session);
  }

  updateSession(id: number, session: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, session, { headers });
  }

  deleteSession(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

 
  getUsersBySession(sessionId: number): Observable<User[]> {
    const url = `${this.showUsers}/bySession/${sessionId}`;
    return this.http.get<User[]>(url);
  }
  

  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.showUsers}/${username}/id`);
  }



  affecterUsersToSession(idSession: number, idUsers: number[]): Observable<string> {
    const url = `${this.apiUrl}/${idSession}/affecterUsers`;
    return this.http.post<string>(url, idUsers);
  }


}

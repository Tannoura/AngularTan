import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private presenceUrl = 'http://localhost:8083/hrmaps/presence';

  constructor(private http: HttpClient) { }

  markPresence(userId: number, sessionId: number, present: boolean): Observable<void> {
    return this.http.post<void>(`${this.presenceUrl}/${userId}/${sessionId}/${present}`, {});
  }

}

import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur } from '../Models/Formateur';
import { Response } from '../Models/Response';
import { Question } from '../Models/Question';



@Injectable({
  providedIn: 'root'
})
export class formateurService {

  private apiUrl = 'http://localhost:8083/hrmaps/api/formateurs';
 
  private quesUrl = 'http://localhost:8083/hrmaps/question/add';
  private resUrl = 'http://localhost:8083/hrmaps/api/responses';
private affQues = 'http://localhost:8083/hrmaps/question/allQuestions';
  constructor(private http: HttpClient) {} 

  getFormateur(id: number): Observable<Formateur> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Formateur>(url);
  }

    getAllFormateurs(): Observable<Formateur[]> {
    
      return this.http.get<Formateur[]>(this.apiUrl/*, { headers: headers }*/);
  }
  addFormateur(formateur: Formateur): Observable<Formateur> {
    const headers = new HttpHeaders({
    });
    return this.http.post<Formateur>(this.apiUrl, formateur, { headers: headers });
  }

  deleteFormateurs(id: number): Observable<any> {
    console.log("idddd",id)
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
/////////////////quiz question reponse////////////////////

addReponse(response: Response): Observable<Response> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<Response>(this.resUrl, response, { headers: headers });
}



addQuestion(question: Question): Observable<Question> {
  const headers = new HttpHeaders({
  });
  console.log('Question à envoyer:', question);  // Ajoutez cette ligne
  return this.http.post<Question>(this.quesUrl, question, { headers: headers });
}
 


getAllResponses(): Observable<Response[]> {
    
  return this.http.get<Response[]>(this.resUrl);
}
  
getAllQuestions(): Observable<Question[]> {
    
  return this.http.get<Question[]>(this.affQues/*, { headers: headers }*/);
}

}

import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from '../Models/Formation';
import { Observable } from 'rxjs';
import { Organisme } from '../Models/Organisme';
imports: [HttpClientModule]

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  

  private apiUrl = 'http://localhost:8083/hrmaps/api/formations';
  constructor(private http: HttpClient) {} 

  // formation.service.ts


getFormationById(id: number): Observable<Formation> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Formation>(url);
}


    getAllFormations(): Observable<Formation[]> {
    
      return this.http.get<Formation[]>(this.apiUrl/*, { headers: headers }*/);
  }
  
  
  addFormation(formation: Formation): Observable<Formation> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 

    return this.http.post<Formation>(this.apiUrl, formation, { headers: headers});
  }

  

  deleteFormations(id: number): Observable<any> {
    console.log("idddd",id)
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  // formation.service.ts

updateFormation(formation: Formation): Observable<string> {
  const url = `${this.apiUrl}/${formation.id}`;
  return this.http.put<string>(url, formation);
}


getOrganismeByFormationId(formationId: number): Observable<Organisme[]> {
  const url = `${this.apiUrl}/getFormation/${formationId}/organismes`;
  return this.http.get<Organisme[]>(url);
}

}

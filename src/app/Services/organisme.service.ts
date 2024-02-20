import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organisme } from '../Models/Organisme';
import { Observable } from 'rxjs';
import { Formation } from '../Models/Formation';

@Injectable({
  providedIn: 'root'
})
export class OrganismeService {

  private apiUrl = 'http://localhost:8083/hrmaps/addOrganisme';
  private getUrl = 'http://localhost:8083/hrmaps/getOrganisme';
  private delUrl = 'http://localhost:8083/hrmaps/deleteOrganisme';
  private affect = 'http://localhost:8083/hrmaps';

  private getFor = 'http://localhost:8083/hrmaps/getOrganisme';

 


  constructor(private http: HttpClient) {}

  getOrganisme(id: number): Observable<Organisme> {
    const url = `${this.getUrl}/${id}`;
    return this.http.get<Organisme>(url);
  }

  getAllOrganismes(): Observable<Organisme[]> {
    return this.http.get<Organisme[]>(this.getUrl);
  }

  addOrganisme(organisme: Organisme): Observable<Organisme> {
    return this.http.post<Organisme>(this.apiUrl, organisme);
  }

  deleteOrganisme(id: number): Observable<any> {
    return this.http.delete(`${this.delUrl}/${id}`);
  }


  affecterFormations(organismeId: number, formationsIds: number[]): Observable<any> {
    const url = `${this.affect}/${organismeId}/affecterFormations`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = formationsIds;

    return this.http.post(url, body, { headers: headers });
  }


  getAllFormations(): Observable<Formation[]> {
    const url = 'http://localhost:8083/hrmaps/api/formations'; // Assurez-vous de mettre le bon URL de votre API
    return this.http.get<Formation[]>(url);
  }

  getFormationsForOrganisme(id: number): Observable<Formation[]> {
    const url = `${this.getFor}/${id}/formations`;
    return this.http.get<Formation[]>(url);
  }


}

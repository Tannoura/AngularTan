import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../Models/Facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private apiUrl = 'http://localhost:8083/hrmaps/api/factures';




  constructor(private http: HttpClient) {} 

  getFacture(id: number): Observable<Facture> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Facture>(url);
  }

    getAllFactures(): Observable<Facture[]> {
    
      return this.http.get<Facture[]>(this.apiUrl/*, { headers: headers }*/);
  }
addFacture(facture: Facture): Observable<Facture> {
  const headers = new HttpHeaders({
  });
  return this.http.post<Facture>(this.apiUrl, facture, { headers: headers });
}

deleteFactures(id: number): Observable<any> { 
  console.log("idddd",id)
  return this.http.delete(`${this.apiUrl}/${id}`);
}



}

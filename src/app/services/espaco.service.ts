import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Espaco } from '../interfaces/espaco.interface';

@Injectable({
  providedIn: 'root'
})

export class EspacoService {
  private apiUrl = 'http://localhost:8080/api/espaco';

  constructor(private http: HttpClient) { }

  obterEspacos(): Observable<any>{
    return this.http.get(this.apiUrl);
  } 

  obterEspacoPorId(id: number): Observable<Espaco> {
    return this.http.get<Espaco>(`${this.apiUrl}/${id}`);
  }

  criarEspaco(espaco: Espaco): Observable<Espaco> {
    return this.http.post<Espaco>(this.apiUrl, espaco);
  }

  atualizarEspaco(espaco: Espaco): Observable<Espaco> {
    return this.http.put<Espaco>(`${this.apiUrl}/${espaco.id}`, espaco);
  }

  deletarEspaco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
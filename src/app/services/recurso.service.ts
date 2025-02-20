import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Espaco } from '../interfaces/espaco.interface';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

private apiUrl = 'http://localhost:8080/api/espaco';

constructor(private http: HttpClient) { }

}

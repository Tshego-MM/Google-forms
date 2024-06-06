import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormResponses} from '../models/forms.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyformsService {
  constructor(private http: HttpClient) {}

  getFormResponses(formId: string): Observable<FormResponses> {
    return this.http.get<FormResponses>(`http://localhost:3000/api/responses/${formId}`);
  }
}

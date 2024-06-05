import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forms } from '../models/forms.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyformsService {
  constructor(private http: HttpClient) {}

  getMyForms(username: string): Observable<Forms[]> {
    return this.http.get<Forms[]>(`/api/forms/myforms?${username}`);
  }

  getFormResponses(formId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/forms/${formId}`);
  }
}

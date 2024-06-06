import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormResponses} from '../models/forms.model';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyformsService {
  private readonly url = `${environment.serverOrigin}/api`

  constructor(private http: HttpClient) {}

  getFormResponses(formId: string): Observable<FormResponses> {
    return this.http.get<FormResponses>(`${this.url}/responses/${formId}`);
  }
}

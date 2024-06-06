import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class FormService {
  url = 'http://localhost:3000/api'

  private http = inject(HttpClient)

  createForm (form: any) {
    return this.http.post(`${this.url}/forms/create`, form)
  }

  fetchForms () {
    return this.http.get<any>(`${this.url}/forms/myforms`)
  }

  fetchForm (id: string) {
    return this.http.get<any>(`${this.url}/forms/${id}`)
  }

  downloadResponses(id: string): Observable<Blob> {
    const url = `${this.url}/download/${id}`;
    return this.http.get(url, { responseType: 'blob' as 'json' });
  }

  createResponse (response: any) {
    return this.http.post<any>(`${this.url}/responses`, response)
  }
}
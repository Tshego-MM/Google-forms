import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@/environments/environment";

@Injectable({
  providedIn: 'root'
})
export default class FormService {
  url = `${environment.serverOrigin}/api`

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

  createResponse (response: any) {
    return this.http.post<any>(`${this.url}/responses`, response)
  }
}
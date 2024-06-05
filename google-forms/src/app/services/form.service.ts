import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class FormService {
  url = 'http://localhost:3000/api/forms'

  private http = inject(HttpClient)

  createForm (form: any) {
    return this.http.post(`${this.url}/create`, form)
  }

  fetchForms () {
    return this.http.get(`${this.url}/myforms`)
  }
}
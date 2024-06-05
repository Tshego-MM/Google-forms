import { getHashParameters } from "@/utilities/url";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { ConstantPool } from "@angular/compiler";
import { Injectable, OnInit, inject, signal } from "@angular/core";
import { tap } from "lodash";
import { catchError, map, of, pipe } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  private http = inject(HttpClient)

  login () {
    return this.http.get<any>('http://localhost:3000/api/login')
  }

  logout () {
    localStorage.clear()
  }
  
  verifyToken (type: string, token: string) {
    return this.http.get<any>(
      'http://localhost:3000/api/users/testJWT',
      {
        headers: { Authorization: `${type} ${token}` },
        responseType: 'text' as 'json',
        observe: 'response' as 'events',
      }
    )
  }

  persistCredentials (credentials: any) {
    localStorage.setItem('CREDENTIALS', JSON.stringify(credentials))
  }

  fetchCredentials () {
    const item = localStorage.getItem('CREDENTIALS')

    if (!item) return null

    return JSON.parse(item)
  }

  isAuthenticated () {
    const credentials = this.fetchCredentials()

    if (!credentials['id_token']) return of(false)

    return this
      .verifyToken(credentials['token_type'], credentials['id_token'])
      .pipe(catchError(() => of(false)))
  }
}
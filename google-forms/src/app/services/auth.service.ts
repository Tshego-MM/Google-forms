import { getHashParameters } from "@/utilities/url";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit, inject, signal } from "@angular/core";
import { catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  private http = inject(HttpClient)

  // credentials = signal<any>(null)

  // ngOnInit () {
  //   const credentials = localStorage.getItem('credentials')
  //   console.log('CRED', credentials)
  //   this.credentials.set(credentials ? JSON.parse(credentials) : null)
  // }

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
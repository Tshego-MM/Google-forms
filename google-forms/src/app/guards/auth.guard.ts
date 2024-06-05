import AuthService from "@/services/auth.service";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { catchError, of, throwError } from "rxjs";

const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const credentials = authService.fetchCredentials()

  if (!credentials) {
    router.navigateByUrl('/auth')
    return false
  }

  const token = credentials['id_token']
  const type = credentials['token_type']

  if (!token || !type) {
    router.navigateByUrl('/auth')
    return false
  }

  authService.verifyToken(type, token)
    .pipe(
      catchError(error => {
        router.navigateByUrl('/auth')
        return of(false)
      })
    )
    .subscribe()

  return true
}

export default authGuard
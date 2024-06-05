import AuthService from "@/services/auth.service"
import { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"

const unauthenicated = (url: URL) => {
  const unauthenicatedUrls: string[] = [
    'http://localhost:3000/api/users/testJWT',
  ]

  return unauthenicatedUrls.includes(url.href)
}

const authInterceptor: HttpInterceptorFn = (request, next) => {
  const url = new URL(request.url)

  if (unauthenicated(url)) return next(request)

  const authService = inject(AuthService)
  const credentials = authService.fetchCredentials()
  const bearerToken = credentials?.['id_token']
    ? `${credentials['token_type']} ${credentials['id_token']}`
    : ''

  request = request.clone({
    setHeaders: {
      Authorization: bearerToken
    },
  })

  return next(request)
}

export default authInterceptor
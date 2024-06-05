import LoadingService from "@/services/loading.service"
import { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { finalize } from "rxjs"

const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService)

  loadingService.show()

  return next(request).pipe(
    finalize(() => loadingService.hide())
  )
}

export default loadingInterceptor
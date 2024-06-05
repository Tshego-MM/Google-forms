import { Injectable, input, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export default class LoadingService {
  readonly loading = signal(false)

  show () {
    this.loading.set(true)
  }

  hide () {
    this.loading.set(false)
  }
}
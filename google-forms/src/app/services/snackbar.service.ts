import { Injectable, inject } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export default class SnackbarService {
  private readonly snackbar = inject(MatSnackBar)

  show (parameters: { message: string, action?: string, config?: MatSnackBarConfig }) {
    const { message, action, config } = parameters

    this.snackbar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'info-notification',
      ...config
    })
  }
}
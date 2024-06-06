import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar'

import SpinnerComponent from '@/components/spinner/spinner.component';
import AuthService from '@/services/auth.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatSnackBarModule,
    SpinnerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authService = inject(AuthService)

  ngOnInit () {
    this.authService.isAuthenticated()
      .subscribe(authenticated => {
        if (!authenticated) this.authService.logout()
      })
  }
}
import { Component, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import FooterComponent from "@/components/footer/footer.component";
import HeaderComponent from "@/components/header/header.component";
import BuildFormDialog from "@/components/dialog/build-form/build-form.dialog.component";
import { Router } from "@angular/router";
import AuthService from "@/services/auth.service";
import { getHashParameters } from "@/utilities/url";
import { catchError, finalize, of, throwError } from "rxjs";
import SnackbarService from "@/services/snackbar.service";
import FormService from "@/services/form.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    ClipboardModule,
    FooterComponent,
    HeaderComponent,
  ],
  selector: 'app-home-page',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export default class HomePage implements OnInit {
  public readonly dialog = inject(MatDialog)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly formService = inject(FormService)
  private readonly snackbarService = inject(SnackbarService)

  loggedIn = false

  forms: any[] = []

  onOpenBuildFormDialog () {
    this.dialog.open(BuildFormDialog)
  }

  ngOnInit () {
    let isLocalStorageUpdated = false
    let credentials = this.authService.fetchCredentials()

    const token = credentials?.['id_token']

    if (token) {
      this.authService
        .verifyToken(credentials['token_type'], credentials['id_token'])
        .pipe(
          catchError(error => throwError(() => new Error(error.message)))
        )
        .subscribe(() => {
          this.authService.persistCredentials(credentials)
          isLocalStorageUpdated = true
        })
    }

    if (isLocalStorageUpdated) return

    credentials = getHashParameters()

    if (credentials) {
      this.authService
        .verifyToken(credentials['token_type'], credentials['id_token'])
        .pipe(
          catchError(error => {
            this.router.navigateByUrl('/auth')
            return throwError(() => new Error(error.message))
          })
        )
        .subscribe(() => {
          this.authService.persistCredentials(credentials)
        })
    }

    this.formService.fetchForms().subscribe(forms => {
      this.forms = forms
    })
  }

  logout () {
    this.authService.logout()
    this.router.navigateByUrl('/auth')
  }

  onViewForm (id: string) {
    this.router.navigate(['survey', id])
  }

  onCopy () {
    this.snackbarService.show({ message: 'Copied to clipboard!' })
  }

  surveyUrl (id: string) {
    return `${window.location.origin}/survey/${id}`
  }
}
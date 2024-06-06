import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import FooterComponent from '@/components/footer/footer.component';
import HeaderComponent from '@/components/header/header.component';
import BuildFormDialog from '@/components/dialog/build-form/build-form.dialog.component';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import AuthService from '@/services/auth.service';
import { getHashParameters } from '@/utilities/url';
import { catchError, finalize, of, pipe, throwError } from 'rxjs';
import SnackbarService from '@/services/snackbar.service';
import FormService from '@/services/form.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
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
  public readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly formService = inject(FormService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly route = inject(ActivatedRoute);

  loggedIn = false;

  forms: any[] = [];

  onOpenBuildFormDialog() {
    this.dialog.open(BuildFormDialog);
  }

  // We do it in this order (instead of early return) because we want to
  // prioritize what could be latest token (from the URL)
  ngOnInit() {
    let credentials = getHashParameters();

    if (credentials?.['id_token'] && credentials?.['token_type']) {
      this.authService.persistCredentials(credentials);
      this.formService.fetchForms().subscribe((forms) => (this.forms = forms));
    } else {
      credentials = this.authService.fetchCredentials();
      this.authService.isAuthenticated()
        .subscribe(authenticated => {
          if (!authenticated) {
            this.router.navigateByUrl('/auth')
            return
          }

          this.formService.fetchForms()
            .subscribe((forms) => (this.forms = forms));
        })
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  onViewFormResponse(formId: string) {
    this.router.navigate(['responses', formId]);
  }

  onViewForm(id: string) {
    this.router.navigate(['survey', id]);
  }

  onDownloadForm(id: string) {
    this.formService.downloadResponses(id).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, error => {
      this.snackbarService.show({ message: `Error downloading file ${error}` });
    });
  }

  onCopy() {
    this.snackbarService.show({ message: 'Copied to clipboard!' });
  }

  surveyUrl(id: string) {
    return `${window.location.origin}/survey/${id}`;
  }
}

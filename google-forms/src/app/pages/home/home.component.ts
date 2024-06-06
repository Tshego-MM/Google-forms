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

  ngOnInit() {
    let credentials = getHashParameters();

    if (credentials?.['id_token'] && credentials?.['token_type']) {
      this.authService.persistCredentials(credentials);
    } else {
      credentials = this.authService.fetchCredentials();
    }

    this.formService.fetchForms().subscribe((forms) => (this.forms = forms));
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

  onCopy() {
    this.snackbarService.show({ message: 'Copied to clipboard!' });
  }

  surveyUrl(id: string) {
    return `${window.location.origin}/survey/${id}`;
  }
}

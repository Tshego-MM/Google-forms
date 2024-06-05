import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar'

import SpinnerComponent from './components/spinner/spinner.component';

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
export class AppComponent {}

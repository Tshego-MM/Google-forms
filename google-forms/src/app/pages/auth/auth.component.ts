import AuthService from "@/services/auth.service";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  imports: [
    MatButtonModule,
  ],
  selector: 'app-auth-page',
  standalone: true,
  styleUrl: './auth.component.scss',
  templateUrl: './auth.component.html',
})
export default class AuthPage {
  private readonly authService = inject(AuthService)

  onContinue () {
    this.authService.login().subscribe(({ url }) => window.location.href = url)
  }
}
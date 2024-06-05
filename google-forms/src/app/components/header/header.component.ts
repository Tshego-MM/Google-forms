import { Component } from "@angular/core";
import { RouterModule } from '@angular/router';
@Component({
  imports: [RouterModule],
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export default class HeaderComponent {}
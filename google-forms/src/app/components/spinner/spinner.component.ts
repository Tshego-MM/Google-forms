import LoadingService from "@/services/loading.service";
import { Component, inject, input } from "@angular/core";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  imports: [
    MatProgressSpinnerModule,
  ],
  selector: 'app-spinner',
  standalone: true,
  styleUrl: './spinner.component.scss',
  templateUrl: './spinner.component.html',
})
export default class SpinnerComponent {
  loadingService = inject(LoadingService)
}
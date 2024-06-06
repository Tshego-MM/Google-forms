import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyformsService } from 'src/app/api/myforms.service';
import { Forms } from 'src/app/models/forms.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  forms: Forms[] = [];
  noDataMessage: string = '';
  constructor(private myFormsService: MyformsService) {
    this.myFormsService.getMyForms('').subscribe(
      (data) => {
        this.forms = data;
      },
      (err) => {
        this.noDataMessage = "You don't have any forms at the moment.";
      }
    );
  }
}

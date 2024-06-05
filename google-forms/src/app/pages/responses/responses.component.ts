import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyformsService } from 'src/app/api/myforms.service';

@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.css',
})
export class ResponsesComponent {
  responses: any[] = [];
  noDataMessage: string = "";
  constructor(private myFormsService: MyformsService) {
    this.myFormsService.getMyForms('').subscribe(
      (data) => {
        this.responses = data;
      },
      (err) => {
        this.noDataMessage = "There are no responses yet.";
      }
    );
  }
}

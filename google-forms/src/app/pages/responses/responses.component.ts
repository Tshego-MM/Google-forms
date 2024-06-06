import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyformsService } from 'src/app/api/myforms.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormResponses } from 'src/app/models/forms.model';
import { ActivatedRoute } from '@angular/router';
import HeaderComponent from "@/components/header/header.component";
import FooterComponent from "@/components/footer/footer.component";

@Component({
    selector: 'app-responses',
    standalone: true,
    templateUrl: './responses.component.html',
    styleUrl: './responses.component.scss',
    imports: [CommonModule, CdkAccordionModule, HeaderComponent, FooterComponent]
})
export class ResponsesComponent implements OnInit {
  responses!: FormResponses;
  noDataMessage: string = '';
  constructor(
    private myFormsService: MyformsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.myFormsService.getFormResponses(params.get('id') ?? '').subscribe(
        (data: FormResponses) => {
          this.responses = data;
        },
        (err: any) => {
          this.noDataMessage = 'There are no responses yet.';
        }
      );
    });
  }
}

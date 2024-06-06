import FormElementComponent from "@/components/element/element.component";
import HeaderComponent from "@/components/header/header.component";
import ElementThumbnailComponent from "@/components/thumbnail/element/element.thumbnail.component";
import FormService from "@/services/form.service";
import SnackbarService from "@/services/snackbar.service";
import { CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop";
import { Component, inject } from "@angular/core";
import {  FormArray, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Component({
    selector: 'app-survey-page',
    standalone: true,
    styleUrl: './survey.component.scss',
    templateUrl: './survey.component.html',
    imports: [
        CdkDrag,
        CdkDragPlaceholder,
        CdkDropList,
        CdkDropListGroup,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        HeaderComponent,
        FormElementComponent,
        ElementThumbnailComponent
    ]
})
export default class SurveyPage {
  private readonly route = inject(ActivatedRoute)
  private readonly formService = inject(FormService)
  private readonly snackbarService = inject(SnackbarService)

  id = ''
  title = 'New Form'
  description = 'A generic form'

  fields: any[] = []

  form = new FormArray<FormControl>([])
  survey: any = {}

  ngOnInit () {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? ''
    })

    this.formService.fetchForm(this.id)
      .subscribe(survey => {
        this.survey = survey
        console.log(this.survey)

        this.survey.questions.forEach(() => {
          const control: FormControl = new FormControl('');
          this.form.push(control, { emitEvent: false })
        })
      })
  }

  formKeys () {
    return Object.keys(this.form.controls)
  }

  getControl (name: string) {
    return this.form.get(name) as FormControl
  }

  submit () {
    const request = {
      formId: this.id,
      responses: this.survey.questions.map((q: any, index: number) => ({
        questionId: q.questionId,
        response: this.form.value[index],
      }))
    }

    this.formService.createResponse(request)
      .pipe(
        catchError(error => {
          this.snackbarService.show({ message: 'Error submitting response' })
          return throwError(() => new Error(error.message))
        })
      )
      .subscribe(() => {
        this.snackbarService.show({ message: 'Response submitted!' })
      })
  }
}
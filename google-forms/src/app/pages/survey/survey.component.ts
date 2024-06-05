import FormElementComponent from "@/components/element/element.component";
import HeaderComponent from "@/components/header/header.component";
import ElementThumbnailComponent from "@/components/thumbnail/element/element.thumbnail.component";
import { CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop";
import { Component, input } from "@angular/core";
import {  FormArray, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
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
    ElementThumbnailComponent,
  ],
  selector: 'app-survey-page',
  standalone: true,
  styleUrl: './survey.component.scss',
  templateUrl: './survey.component.html',
})
export default class SurveyPage {
  title = 'New Form'
  description = 'A generic form'

  fields: any[] = []

  form = new FormArray<FormControl>([])
  ngOnInit () {
    const item = localStorage.getItem('FORM') 

    if (!item) return

    const survey = JSON.parse(item)

    if (survey.title?.length) this.title = survey.title
    if (survey.description?.length) this.description = survey.description
    if (survey.questions?.length) this.fields = survey.questions

    console.log('SURVEY',survey)

    survey.questions.forEach(() => {
      const control: FormControl = new FormControl('');
      this.form.push(control, { emitEvent: false })
    })
  }

  formKeys () {
    return Object.keys(this.form.controls)
  }

  getControl (name: string) {
    return this.form.get(name) as FormControl
  }

  submit () {console.log("logged")}
}
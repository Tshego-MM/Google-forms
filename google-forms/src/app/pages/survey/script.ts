import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card'
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { MatIconModule } from '@angular/material/icon'

import HeaderComponent from "../../components/header/script";
import { MatButtonModule } from "@angular/material/button";
import FormElementComponent from "../../components/form-element/script";
import { fields } from "../../constants/fields";
import FieldThumbnailComponent from "../../thumbnails/field/script";
import { cloneDeep } from "lodash";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  imports: [
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList,
    CdkDropListGroup,
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    FormElementComponent,
    MatIconModule,
    FieldThumbnailComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  selector: 'app-survey-page',
  standalone: true,
  styleUrl: './stylesheet.sass',
  templateUrl: './template.html',
})
export default class SurveyPage {
  title = 'New Form'
  description = 'A generic form'

  fields: any[] = []

  form = new FormGroup({})

  ngOnInit () {
    const item = JSON.parse(
      localStorage.getItem('NEW_FORM') ?? '{}'
    )

    if (item.metadata?.title?.length) this.title = item.metadata?.title
    if (item.metadata?.description?.length) this.description = item.metadata?.description
    if (item.content?.length) this.fields = item.content

    item.content.forEach((c: any) => {
      console.log('C', c)
      this.form.addControl(c.properties.name, new FormControl(''), { emitEvent: false })
    })

    console.log('CONTENT', this.fields.map(f => f.properties.question))
    console.log('FORM', this.form.value)
  }

  formKeys () {
    return Object.keys(this.form.controls)
  }

  getControl (name: string) {
    return this.form.get(name) as FormControl
  }

  submit () {}
}
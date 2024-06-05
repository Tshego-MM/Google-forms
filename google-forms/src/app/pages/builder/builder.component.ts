import HeaderComponent from "@/components/header/header.component";
import { Component, inject } from "@angular/core";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
  copyArrayItem,
  moveItemInArray,
  
} from '@angular/cdk/drag-drop'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { fields } from "@/constants/fields";
import { cloneDeep } from "lodash";
import ElementThumbnailComponent from "@/components/thumbnail/element/element.thumbnail.component";
import FormElementComponent from "@/components/element/element.component";
import { MatButtonModule } from "@angular/material/button";
import FormService from "@/services/form.service";
import { catchError, finalize, throwError } from "rxjs";
import SnackbarService from "@/services/snackbar.service";
import { Router } from "@angular/router";

@Component({
  imports: [
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList,
    CdkDropListGroup,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    ElementThumbnailComponent,
    HeaderComponent,
    FormElementComponent,
  ],
  selector: 'app-builder-page',
  standalone: true,
  styleUrl: './builder.component.scss',
  templateUrl: './builder.component.html',
})
export default class BuilderPage {
  private readonly formService = inject(FormService)
  private readonly snackbarService = inject(SnackbarService)
  private readonly router = inject(Router)

  title = 'New Form'
  description = 'A generic description'

  isSidebarOpen = true
  components = fields
  fields: any[] = []

  ngOnInit () {
    const item = localStorage.getItem('FORM')

    if (!item) return

    const survey = JSON.parse(item)

    if (survey.metadata?.title?.length) this.title = survey.metadata?.title
    if (survey.metadata?.description?.length) this.description = survey.metadata?.description
  }

  drop (event: CdkDragDrop<typeof fields>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
      return
    }

    const clone = cloneDeep(event)

    copyArrayItem(
      clone.previousContainer.data,
      event.container.data,
      clone.previousIndex,
      event.currentIndex
    )
  }

  discard () {
    localStorage.removeItem('FORM')
    this.router.navigateByUrl("/")
  }

  save () {
    const form = {
      title: this.title,
      description: this.description,
      questions: this.fields.map(f => ({
        required: f.properties.value.required,
        question: f.properties.value.question,
        questionType: 2
      }))
    }

    localStorage.setItem('FORM', JSON.stringify(form))

    this.formService
      .createForm(form)
      .pipe(
        catchError(error => {
          this.snackbarService.show({
            message: 'Error creating form',
            config: { panelClass: 'info-notification' }
          })
          return throwError(() => new Error(error))
        }),
        finalize(() => {
          this.snackbarService.show({
            message: 'Form created successully!',
            config: { panelClass: 'info-notification' }
          })
          this.router.navigateByUrl('/')
        })
      )
      .subscribe()
  }

  toggleSidebar () {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  removeField (key: number) {
    this.fields.splice(key, 1)
  }
}
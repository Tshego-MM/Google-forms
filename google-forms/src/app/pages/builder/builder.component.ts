import HeaderComponent from "@/components/header/header.component";
import { Component } from "@angular/core";
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
  title = 'New Form'
  description = 'A generic description'

  isSidebarOpen = true
  components = fields
  fields: any[] = []

  ngOnInit () {
    const item = JSON.parse(
      localStorage.getItem('NEW_FORM') ?? '{}'
    )

    if (item.metadata?.title?.length) this.title = item.metadata?.title
    if (item.metadata?.description?.length) this.description = item.metadata?.description
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
    localStorage.removeItem('NEW_FORM')
  }

  save () {
    localStorage.setItem('NEW_FORM', JSON.stringify({
      metadata: {
        title: this.title,
        description: this.description,
      },
      content: this.fields.map(f => ({ ...f, properties: f.properties.value })),
    }))
  }

  toggleSidebar () {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  removeField (key: number) {
    this.fields.splice(key, 1)
  }
}
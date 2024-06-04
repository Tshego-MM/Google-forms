import { Component, input } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@Component({
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
  ],
  selector: 'app-element-thumbnail',
  standalone: true,
  styleUrl: './element.thumbnail.component.scss',
  templateUrl: './element.thumbnail.component.html',
})
export default class ElementThumbnailComponent {
  title = input.required<string>()
  icon = input.required<string>()
}
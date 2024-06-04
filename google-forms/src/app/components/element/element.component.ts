import { Component, input, output } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@Component({
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  selector: 'app-form-element',
  standalone: true,
  styleUrl: './element.component.scss',
  templateUrl: './element.component.html',
})
export default class FormElementComponent {
  key = input<number>()

  properties = input.required<FormGroup>()

  removed = output<number>()

  onRemove () {
    this.removed.emit(this.key() ?? -1)
  }
}
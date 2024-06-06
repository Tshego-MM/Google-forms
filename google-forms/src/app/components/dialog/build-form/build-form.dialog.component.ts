import { Component, inject } from "@angular/core";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { capitalize } from 'lodash';
import FormService from "@/services/form.service";

@Component({
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  selector: 'app-build-form-dialog',
  standalone: true,
  styleUrl: './build-form.dialog.component.scss',
  templateUrl: './build-form.dialog.component.html',
})
export default class BuildFormDialog {
  private readonly router = inject(Router)
  private readonly builder = inject(FormBuilder)
  public readonly dialogRef = inject(MatDialogRef<BuildFormDialog>)

  form!: FormGroup

  constructor () {
    this.form = this.builder.group({
      title: ['', [Validators.required,Validators.maxLength(255)]],
      description: ['', [Validators.required,Validators.maxLength(1000)]],
    })
  }

  onCancel () {
    this.dialogRef.close()
  }

  onContinue () {
    this.dialogRef.close()

    const form = {
      metadata: {
        ...this.form.value,
      },
    }

    localStorage.setItem('FORM', JSON.stringify(form))

    this.router.navigateByUrl('/builder')
  }

  errorMessage (controlName: string) {
    const control = this.form.get(controlName)

    if (!control) return null

    if (!control.errors) return null

    for (const key of Object.keys(control.errors)) {
      if (key === 'required') {
        return `${capitalize(controlName)} is a required field`
      }

      return control.errors[key]
    }

    return null
  }
}
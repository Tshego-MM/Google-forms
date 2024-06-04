import { Component } from "@angular/core";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { capitalize } from 'lodash';

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

  form!: FormGroup

  constructor (
    private router: Router,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<BuildFormDialog>
  ) {
    this.form = this.builder.group({
      title: ['', [Validators.required]],
      description: ['', []],
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

    localStorage.setItem('NEW_FORM', JSON.stringify(form))

    // TODO: Navigate to build page with data
    this.router.navigate(['builder'])
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
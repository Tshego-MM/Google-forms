import { FormBuilder, Validators } from "@angular/forms"

const builder = new FormBuilder()

export const fields = [
  {
    title: 'Text Field',
    icon: 'text_fields',
    type: 'text',
    properties: builder.group({
      name: ['', [Validators.required]],
      placeholder: ['', []],
      question: ['', [Validators.required]],
      required: [false, [Validators.required]],
    })
  },
  {
    title: 'Email Field',
    icon: 'mail',
    type: 'email',
    properties: builder.group({
      name: ['', [Validators.required]],
      placeholder: ['', []],
      question: ['', [Validators.required]],
      required: [false, [Validators.required]],
    })
  },
  {
    title: 'Date Field',
    icon: 'calendar_month',
    type: 'date',
    properties: builder.group({
      name: ['', [Validators.required]],
      placeholder: ['', []],
      question: ['', [Validators.required]],
      required: [false, [Validators.required]],
    })
  },
  {
    title: 'Number',
    icon: '123',
    type: 'number',
    properties: builder.group({
      name: ['', [Validators.required]],
      placeholder: ['', []],
      question: ['', [Validators.required]],
      required: [false, [Validators.required]],
    })
  },
]
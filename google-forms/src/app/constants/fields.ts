import { FormBuilder, Validators } from "@angular/forms"

const builder = new FormBuilder()

export const fields = [
  {
    title: 'Text Field',
    icon: 'text_fields',
    type: 'text',
    properties: builder.group({
      placeholder: ['', []],
      question: ['', [Validators.required,Validators.maxLength(255)]],
      required: [false, [Validators.required]],
    })
  },
  {
    title: 'Email Field',
    icon: 'mail',
    type: 'email',
    properties: builder.group({
      placeholder: ['', []],
      question: ['', [Validators.required, Validators.maxLength(255),Validators.email]],
      required: [false, [Validators.required]],
    })
  },
  {
    title: 'Date Field',
    icon: 'calendar_month',
    type: 'date',
    properties: builder.group({
      placeholder: ['', []],
      question: ['', [Validators.required, Validators.maxLength(255), Validators.pattern("(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2}")]],
      required: [false, [Validators.required]],
    })
  },
  {
    title: 'Number',
    icon: '123',
    type: 'number',
    properties: builder.group({
      placeholder: ['', []],
      question: ['', [Validators.required, Validators.maxLength(255)]],
      required: [false, [Validators.required, Validators.pattern("/^\d+$/")]],
    })
  },
]
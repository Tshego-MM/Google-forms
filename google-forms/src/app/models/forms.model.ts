export interface FormResponses {
  responses: Responses;
}

export interface Responses {
  formId:        string;
  formResponses: FormResponse[];
}

export interface FormResponse {
  question:  string;
  responses: string[];
}

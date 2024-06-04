###Create form

POST: /api/forms/create 

Body:
```
{
  "title": "your title",
  "description": "your question",
  "questions": [
    {
      "question": "Are you a student?",
      "questionType": int,
      "options": ["No", "Yes"]
    }
  ]
}
```

Response:
```
{
    status:ok||error,
    message : error message if there is any,
    formLink : hostname/forms/:formId
}
```

###Get form details

GET: /api/forms/:formId
Response:

```
{
    formId : uuid,
    questions: [
        {
            questionId : uuid,
            questionType : int,
            questionPosition : int,
            question : 'Are you a student?',
            options : ['No','Yes'],
        },
        {
            questionId : uuid,
            questionType : int,
            questionPosition : int,
            question : 'How old are you?',
            options : [],
        }
    ]
}
```

###Get all forms created by the user(admin)

GET: api/forms/myforms

Response:
```
[

    {
        "title": "Test title",
        "description": "Test description",
        "formid": "37f088f0-2c1a-45ed-ada1-df50b9392eac"
    },
    {
        "title": "Test form",
        "description": "Q1",
        "formid": "d58e5652-a97b-4f9a-8201-23cc4632a5cd"
    }
]
```



###Submit form response

POST: /api/responses/

Body:
```
{
    formId : uuid,
    override : false, //false by default
    responses : [
        {
            questionId : uuid,
            response : 'No'
        },
        {
            questionId : uuid,
            response : 23
        },
    ]
}
```

If the user has already submitted the responses for that form, we'll ask the user to confirm if they would like to override the previous responses. If so re-send the responses with `override: true`

#\nAPI Response

```
{
    formId : uuid,
    status : warning || ok, //will return status code 409 if the user should confirm to override
    message : Responses already exist for this form. Please confirm if you want to override them.?
    responses : [
        {
            questionId : uuid,
            response : 'No'
        },
        {
            questionId : uuid,
            response : 23
        },
    ]
}   
```

###Get form Responses (admin)

GET: /api/responses/:formId

Body:
```
{
    formId : uuid,
    formResponses : [
        {
            question : 'Are you a student',
            responses : [No, No, Yes]
        },
        {
            question : 'How old are you',
            responses : [23,12, 33]
        }
    ]
}
```


###Donload responses (admin)

GET: /api/responses/download/:formId

Response
```
Excel file
```


#If there are too many request from the same IP:

Response:

```
server code : 429,
{
    "message": "Too many requests from this IP, please try again later."
}
```

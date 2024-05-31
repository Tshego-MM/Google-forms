###Create form

POST: /api/forms/create 

Body:
```
    [
        {
            question : 'Are you a student?',
            questionType : int,
            options : ['No','Yes']
        },
        {
            question : 'How old are you?',
            questionType : int,
            options : []
        }
    ]
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

###Submit form response

POST: /api/responses/

Body:
```
{
    formId : uuid,
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

###Get form Responses

GET: /api/responses/:formId

Body:
```
{
    formId : uuid,
    responses : [
        {
            question : 'Are you a student',
            response : No
        },
        {
            question : 'How old are you',
            response : 23
        }
    ]
}
```

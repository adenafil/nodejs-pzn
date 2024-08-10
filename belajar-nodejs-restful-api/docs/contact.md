# Contact API Spec

## Create Contact API

Endpoint : POST /api/contact

Headers: 
- Authorization : token

Request Body :

```json
{
  "first_name": "Ade",
  "last_name": "Capablanca",
  "email": "adecapablanca@pzn.com",
  "phone": "+1233" 
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Ade",
    "last_name": "Capablanca",
    "email": "adecapablanca@pzn.com",
    "phone": "+1233"
  }
}
```

Response Body Error : 

```json
{
  "errors": "Email is not valid"
}
```

## Update Contact API
Endpoint : PUT /api/contact/:id

- Authorization : token

Request Body :

```json
{
  "first_name": "Ade",
  "last_name": "Capablanca",
  "email": "adecapablanca@pzn.com",
  "phone": "+1233" 
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Ade",
    "last_name": "Capablanca",
    "email": "adecapablanca@pzn.com",
    "phone": "+1233"
  }
}
```


Response Body Error :
```json
{
  "errors": "Email is not valid"
}
```


## Get Contact API
Endpoint : GET /api/contact/:id

- Authorization : token

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "first_name": "Ade",
    "last_name": "Capablanca",
    "email": "adecapablanca@pzn.com",
    "phone": "+1233"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found" 
}
```

## Search Contact API
Endpoint : GET /api/contacts

Headers : 
- Authorization : token

Query params : 
- name : Search by first_name or last_name, using like query, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10


Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Ade",
      "last_name": "Capablanca",
      "email": "adecapablanca@pzn.com",
      "phone": "+1233"
    },
    {
      "id": 1,
      "first_name": "Ade",
      "last_name": "Capablanca",
      "email": "adecapablanca@pzn.com",
      "phone": "+1233"
    }
  ],
  "paging": 1,
  "totalPage": 3,
  "total_item": 30
}
```

Response Body Error :
Response Body Error :
```json
{
  "errors": "contact is not found"
}
```

## Delete Remove Contact API
Endpoint : DELETE /api/contact/:id
        
- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :
```json
{
  "errors": "contact is not found"
}
```

# User API Spec

## Register User API
Endpoint : POST /api/users

Request Body : 

```json
{
  "username": "ade",
  "password": "rahasia",
  "name": "ade nafil capablanca"
}
```

Response Body Success :
```json
{
  "data":{
    "username": "ade",
    "name": "ade nafil capablanca"
  }
}
```

Response Body Error : 

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoinst : POST /api/users/login

Request Body : 

```json
{
  "username": "ade",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Failed : 

```json
{
  "errors": "Username or password is wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers : 
- Authorization : token

Request Body :

```json
{
  "name": "ade nafil capablanca", // optional
  "password": "new password" // optional
}
```

Resoonse Body Success :

```json
{
  "data": {
    "username": "ade",
    "name": "ade nafil capablanca"
  }
}
```

Response Body Failed :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body :

```json
{
  "data": {
    "username": "ade",
    "name": "ade nafil capablanca"
  }
}
```

Response Body Failed :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Response Body Success : 

```json
{
  "data": "OK"
}
```

Response Body Failed :

```json
{
  "errors": "Unauthorized"
}
```
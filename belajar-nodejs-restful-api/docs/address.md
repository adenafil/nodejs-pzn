# Address API Spec

## Create Address API
Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization : Token

Request Body : 
```json
{
  "street": "Jalan Apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode Pos apa"
}
```

Response Body Success : 
```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode Pos apa"
  }

}
```

Response Body Error : 
```json
{
  "errors": "Country is required"
}
```
## Update Address API
Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : Token

Request Body :
```json
{
  "street": "Jalan Apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode Pos apa"
}
```

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode Pos apa"
  }

}
```

Response Body Error :
```json
{
  "errors": "Country is required"
}
```

## Get Address API
Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : Token

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode Pos apa"
  }

}
```
Response Body Error :
```json
{
  "errors": "contact is not found"
}
```
## List Address API
Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization : Token

Response Body Success :
```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan Apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode Pos apa"
    },
    {
      "id": 2,
      "street": "Jalan Apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode Pos apa"
    }
  ]
}
```
Response Body Error :
```json
{
  "errors": "contact is not found"
}
```

## Remove Address API
Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : Token

Response Body Success :

```json
{
  "data": "OK"
}
```
Response Body Error : 
```json
{
  "errors": "address is not found"
}
```

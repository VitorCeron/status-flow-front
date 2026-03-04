# List Users

Method: GET
Url: {{base_url}}/backoffice/users
Headers: token
Body: None

Response:

```json
{
  "data": [
    {
      "id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
      "name": "Teste name 123",
      "email": "test@test.com",
      "timezone": "America/Antigua",
      "role": "user",
      "created_at": "2026-02-25T16:34:20.000000Z",
      "updated_at": "2026-02-25T16:34:20.000000Z",
      "deleted_at": null
    }
    // ... another users
  ],
  "links": {
    "first": "http://localhost/api/backoffice/users?page=1",
    "last": "http://localhost/api/backoffice/users?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "http://localhost/api/backoffice/users?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "path": "http://localhost/api/backoffice/users",
    "per_page": 10,
    "to": 2,
    "total": 2
  }
}
```

# Details user

Method: GET
Url: {{base_url}}/backoffice/users/{id}
Headers: token
Body: None

Response:

```json
{
  "data": {
    "id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
    "name": "Teste name 123",
    "email": "test@test.com",
    "timezone": "America/Antigua",
    "role": "user",
    "created_at": "2026-02-25T16:34:20.000000Z",
    "deleted_at": null
  }
}
```

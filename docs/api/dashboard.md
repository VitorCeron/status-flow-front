# List

Method: GET
Url: {{base_url}}/dashboard
Headers: token
Body: None
Response:

```json
{
  "data": {
    "total_monitors": 10,
    "total_up": 0,
    "total_down": 0,
    "last_monitors": [
      {
        "id": "a12c9d47-b382-4b90-a7b9-af25d70eff4b",
        "name": "admin@statusflow.com",
        "url": "http://google.com/",
        "is_up": false,
        "status": "unknown",
        "created_at": "2026-02-26T18:18:13.000000Z"
      },
      {
        "id": "a12c9d45-d784-4653-8a58-abecb06df214",
        "name": "admin@statusflow.com",
        "url": "http://google.com/",
        "is_up": true,
        "status": "unknown",
        "created_at": "2026-02-26T18:18:12.000000Z"
      },
      {
        "id": "a12c9d44-e18d-4139-9107-7b65f6fb8638",
        "name": "admin@statusflow.com",
        "url": "http://google.com/",
        "is_up": true,
        "status": "unknown",
        "created_at": "2026-02-26T18:18:11.000000Z"
      },
      {
        "id": "a12c9d42-1282-4a70-8afb-8970228aa5a5",
        "name": "admin@statusflow.com",
        "url": "http://google.com/",
        "is_up": true,
        "status": "unknown",
        "created_at": "2026-02-26T18:18:09.000000Z"
      },
      {
        "id": "a12c9d41-0a4d-4238-a8ae-55da77bb4610",
        "name": "admin@statusflow.com",
        "url": "http://google.com/",
        "is_up": true,
        "status": "unknown",
        "created_at": "2026-02-26T18:18:09.000000Z"
      }
    ]
  }
}
```

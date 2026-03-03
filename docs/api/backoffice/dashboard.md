# API

Method: GET
Url: {{base_url}}/backoffice/dashboard
Headers: token

Response:

```json
{
    "data": {
        "total_users": 2,
        "total_monitors": 3,
        "total_up": 2,
        "total_down": 1,
        "last_users": [
            {
                "id": "a12ada55-6df6-435f-8b09-035cfad36661",
                "name": "New User",
                "email": "new@user.com",
                "timezone": "UTC",
                "created_at": "2026-02-25T21:17:17.000000Z"
            },
            {
                "id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
                "name": "Test",
                "email": "test@test.com",
                "timezone": "UTC",
                "created_at": "2026-02-25T16:34:20.000000Z"
            }
        ],
        "timezones": [
            {
                "timezone": "UTC",
                "total": 2
            }
        ]
    }
}
```

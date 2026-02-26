# Login

Method: POST
Url: {{base_url}}/auth/login
Body:
```json
{
    "email": "test@test.com",
    "password": "!@#Abc123456789"
}
```
Response:
```json
{
    "data": {
        "user": {
            "id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
            "name": "Test",
            "email": "test@test.com",
            "timezone": "UTC",
            "role": "user",
            "created_at": "2026-02-25T16:34:20.000000Z"
        },
        "access_token": "7|lb9L93KwrFsMeaHHrPLjJC6WToYVkoZM8cCo8RIrf2c53fe5",
        "token_type": "Bearer",
        "expires_at": "2026-02-25T20:40:27.000000Z"
    }
}
```

# Logout

Method: POST
Url: {{base_url}}/auth/logout
Headers: token
Body: None
Response: None

# Register

Method: POST
Url: {{base_url}}/auth/register
Body:

```json
{
    "name": "Test",
    "email": "test2@test.com",
    "password": "!@#Abc123456789",
    "password_confirmation": "!@#Abc123456789"
}
```

Response:

```json
{
    "data": {
        "user": {
            "id": "a12a7532-ae36-4c1e-a123-4a88ea01926f",
            "name": "Test",
            "email": "test2@test.com",
            "timezone": "UTC",
            "role": "user",
            "created_at": "2026-02-25T16:34:29.000000Z"
        },
        "access_token": "4|m8skD3fEdodXl8pet6rKaEjKtExjXWMAL0QUYrVuf464ae05",
        "token_type": "Bearer",
        "expires_at": "2026-02-25T17:34:29.000000Z"
    }
}
```

# Me

Method: GET
Url: {{base_url}}/auth/me
Headers: token
Body: None
Response:
```json
{
    "data": {
        "id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
        "name": "Test",
        "email": "test@test.com",
        "timezone": "UTC",
        "role": "user",
        "created_at": "2026-02-25T16:34:20.000000Z"
    }
}
```

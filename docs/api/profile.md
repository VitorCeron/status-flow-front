# Timezones

Method: GET
Url: {{base_url}}/profile/timezones
Headers: token

Response:

```json
{
  "data": [
    {
      "value": "Africa/Abidjan",
      "label": "Africa/Abidjan"
    },
    {
      "value": "Africa/Accra",
      "label": "Africa/Accra"
    },
    {
      "value": "Africa/Addis_Ababa",
      "label": "Africa/Addis_Ababa"
    }
    // ... all timezones
  ]
}
```

# Update profile

Method: GET
Url: {{base_url}}/profile/settings
Headers: token

Body:

```json
{
  "name": "Teste name",
  "timezone": "Africa/Freetown"
}
```

Response:

```json
{
  "data": {
    "id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
    "name": "Teste name",
    "email": "test@test.com",
    "timezone": "Africa/Freetown",
    "role": "user",
    "created_at": "2026-02-25T16:34:20.000000Z"
  }
}
```

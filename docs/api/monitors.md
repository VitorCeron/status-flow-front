# Store

Method: POST
Url: {{base_url}}/monitors
Headers: token
Body:

```json
{
  "name": "admin@statusflow.com", //test@test.com | admin@statusflow.com
  "url": "http://google.com/",
  "method": "GET",
  "interval": 60,
  "timeout": 10,
  "fail_threshold": 3,
  "notify_email": "test@test.com",
  "is_active": true
}
```

Response:

```json
{
  "data": {
    "id": "a12b3ac6-96af-41c9-8eb5-1adef384587e",
    "user_id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
    "name": "admin@statusflow.com",
    "url": "http://google.com/",
    "method": "GET",
    "interval": 60,
    "timeout": 10,
    "fail_threshold": 3,
    "notify_email": "test@test.com",
    "is_active": true,
    "status": "unknown",
    "last_checked_at": null,
    "created_at": "2026-02-26T01:46:57.000000Z",
    "updated_at": "2026-02-26T01:46:57.000000Z"
  }
}
```

# List

Method: GET
Url: {{base_url}}/monitors?per_page=10&page=1
Headers: token
Body: None
Response:

```json
{
  "data": [
    {
      "id": "a12b418b-560d-43a0-abdb-0076903ae8c6",
      "user_id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
      "name": "Reddit 2",
      "url": "https://www.reddit.com",
      "method": "GET",
      "interval": 60,
      "timeout": 10,
      "fail_threshold": 3,
      "notify_email": "test@test.com",
      "is_active": false,
      "status": "unknown",
      "last_checked_at": null,
      "created_at": "2026-02-26T02:05:53.000000Z",
      "updated_at": "2026-02-26T02:06:04.000000Z"
    }
    // ...
  ],
  "links": {
    "first": "http://localhost/api/monitors?page=1",
    "last": "http://localhost/api/monitors?page=1",
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
        "url": "http://localhost/api/monitors?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "path": "http://localhost/api/monitors",
    "per_page": 10,
    "to": 2,
    "total": 2
  }
}
```

# Show

Method: GET
Url: {{base_url}}/monitors/{{uuid}}
Headers: token
Body: None
Response:

```json
{
  "data": {
    "id": "a12b39c4-816b-413a-8dc5-5ec72389f5bb",
    "user_id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
    "name": "admin@statusflow.com",
    "url": "http://google.com/",
    "method": "GET",
    "interval": 60,
    "timeout": 10,
    "fail_threshold": 3,
    "notify_email": "test@test.com",
    "is_active": true,
    "status": "unknown",
    "last_checked_at": null,
    "created_at": "2026-02-26T01:44:08.000000Z",
    "updated_at": "2026-02-26T01:44:08.000000Z"
  }
}
```

# Update

Method: PUT
Url: {{base_url}}/monitors/{{uuid}}
Headers: token
Body:

```json
{
  "name": "Google",
  "url": "http://google.com/",
  "method": "GET",
  "interval": 60,
  "timeout": 10,
  "fail_threshold": 3,
  "notify_email": "test@test.com",
  "is_active": true
}
```

Response:

```json
{
  "data": {
    "id": "a12b39c4-816b-413a-8dc5-5ec72389f5bb",
    "user_id": "a12a7525-8a13-427b-ba6a-2871e53bf9d5",
    "name": "Google",
    "url": "http://google.com/",
    "method": "GET",
    "interval": 60,
    "timeout": 10,
    "fail_threshold": 3,
    "notify_email": "test@test.com",
    "is_active": true,
    "status": "unknown",
    "last_checked_at": null,
    "created_at": "2026-02-26T01:44:08.000000Z",
    "updated_at": "2026-02-26T01:45:41.000000Z"
  }
}
```

# Delete

Method: DELETE
Url: {{base_url}}/monitors/{{uuid}}
Headers: token
Body: None
Response: None

# Stats

Method: GET
URL: {{base_url}}/monitors/{{uuid}}/stats
Body: None
Response:

```json
{
  "data": {
    "response_time_chart": [
      {
        "date": "2026-02-24",
        "avg_ms": 130,
        "min_ms": 43,
        "max_ms": 510
      },
      {
        "date": "2026-02-25",
        "avg_ms": 120,
        "min_ms": 43,
        "max_ms": 510
      },
      {
        "date": "2026-02-26",
        "avg_ms": 120,
        "min_ms": 43,
        "max_ms": 510
      },
      {
        "date": "2026-02-27",
        "avg_ms": 120,
        "min_ms": 43,
        "max_ms": 510
      }
    ],
    "checks_history": [
      {
        "id": "a12e6643-aebb-4ff1-be7a-f44f7b440dee",
        "status": "up",
        "response_code": 200,
        "response_time_ms": 88,
        "checked_at": "2026-02-27T15:36:02.000000Z"
      },
      {
        "id": "a12e658d-d5f0-4882-887b-d5970f4e4e62",
        "status": "up",
        "response_code": 200,
        "response_time_ms": 111,
        "checked_at": "2026-02-27T15:34:03.000000Z"
      }
      // ...
    ],
    "status_timeline": [
      {
        "checked_at": "2026-02-27T15:36:02.000000Z",
        "status": "up"
      },
      {
        "checked_at": "2026-02-27T15:34:03.000000Z",
        "status": "up"
      }
      // ...
    ],
    "uptime_percentage": 100,
    "last_fail": null
  }
}
```

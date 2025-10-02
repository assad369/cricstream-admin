# Sports Streaming API Documentation

## Base URL
http://localhost:5000/api


## Authentication
All protected endpoints require a JWT token in the Authorization header:

Authorization: Bearer <token>

## Endpoints

### Authentication

#### Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }

Success Response (201):

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "638a3e3e3e3e3e3e3e3e3e3e",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
### Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**


```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
- **Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "638a3e3e3e3e3e3e3e3e3e3e",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Get Current User
- **URL:** `/auth/me`
- **Method:** `GET`
- **Auth Required:** `Yes`
- **Success Response (200):**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "638a3e3e3e3e3e3e3e3e3e3e",
      "email": "admin@example.com",
      "role": "admin",
      "lastActive": "2023-12-01T12:34:56.789Z"
    }
  }
}
```

## Update Password
- **URL:** `/auth/updatepassword`
- **Method:** `PUT`
- **Auth Required:** `Yes`
- **Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```
- **Succes Response:** `200`
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```


# Streams API

## Get All Streams

**URL:** `/streams`  
**Method:** `GET`  
**Auth Required:** ✅ Yes

### Query Parameters

| Name       | Type    | Default | Description                  |
|------------|---------|---------|------------------------------|
| `page`     | number  | 1       | Page number                  |
| `limit`    | number  | 10      | Items per page               |
| `search`   | string  | -       | Search term                  |
| `category` | string  | -       | Category ID                  |
| `isLive`   | boolean | -       | Filter by live status        |

### Success Response (200):
```json
{
  "success": true,
  "message": "Streams retrieved successfully",
  "data": [
    {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "title": "Match: Team A vs Team B",
      "team1": {
        "name": "Team A",
        "logo": "https://example.com/team-a-logo.png"
      },
      "team2": {
        "name": "Team B",
        "logo": "https://example.com/team-b-logo.png"
      },
      "date": "2023-12-15T18:00:00.000Z",
      "streamURL": "https://example.com/stream-url",
      "expiryTime": "2023-12-15T22:00:00.000Z",
      "category": {
        "_id": "638a3e3e3e3e3e3e3e3e3e3e",
        "name": "Football",
        "slug": "football"
      },
      "isLive": true,
      "views": 1250,
      "createdAt": "2023-12-01T12:34:56.789Z",
      "updatedAt": "2023-12-01T12:34:56.789Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Get Single Stream

**URL:** `/streams/:id`  
**Method:** `GET`  
**Auth Required:** ✅ Yes

### Success Response (200)

```json
{
  "success": true,
  "message": "Stream retrieved successfully",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "title": "Match: Team A vs Team B",
    "team1": {
      "name": "Team A",
      "logo": "https://example.com/team-a-logo.png"
    },
    "team2": {
      "name": "Team B",
      "logo": "https://example.com/team-b-logo.png"
    },
    "date": "2023-12-15T18:00:00.000Z",
    "streamURL": "https://example.com/stream-url",
    "expiryTime": "2023-12-15T22:00:00.000Z",
    "category": {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "name": "Football",
      "slug": "football"
    },
    "isLive": true,
    "views": 1250,
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T12:34:56.789Z"
  }
}
```

## Create Stream

**URL:** `/streams`  
**Method:** `POST`  
**Auth Required:** ✅ Yes  

### Request Body

```json
{
  "title": "Match: Team A vs Team B",
  "team1": {
    "name": "Team A",
    "logo": "https://example.com/team-a-logo.png"
  },
  "team2": {
    "name": "Team B",
    "logo": "https://example.com/team-b-logo.png"
  },
  "date": "2023-12-15T18:00:00.000Z",
  "streamURL": "https://example.com/stream-url",
  "expiryTime": "2023-12-15T22:00:00.000Z",
  "category": "638a3e3e3e3e3e3e3e3e3e3e",
  "isLive": true
}
```
### Success Response (201):
```json
{
  "success": true,
  "message": "Stream created successfully",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "title": "Match: Team A vs Team B",
    "team1": {
      "name": "Team A",
      "logo": "https://example.com/team-a-logo.png"
    },
    "team2": {
      "name": "Team B",
      "logo": "https://example.com/team-b-logo.png"
    },
    "date": "2023-12-15T18:00:00.000Z",
    "streamURL": "https://example.com/stream-url",
    "expiryTime": "2023-12-15T22:00:00.000Z",
    "category": {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "name": "Football",
      "slug": "football"
    },
    "isLive": true,
    "views": 0,
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T12:34:56.789Z"
  }
}
```

## Update Stream

**URL:** `/streams/:id`  
**Method:** `PUT`  
**Auth Required:** ✅ Yes

### Request Body

```json
{
  "title": "Updated Match: Team A vs Team B",
  "team1": {
    "name": "Team A",
    "logo": "https://example.com/team-a-logo.png"
  },
  "team2": {
    "name": "Team B",
    "logo": "https://example.com/team-b-logo.png"
  },
  "date": "2023-12-15T18:00:00.000Z",
  "streamURL": "https://example.com/stream-url",
  "expiryTime": "2023-12-15T22:00:00.000Z",
  "category": "638a3e3e3e3e3e3e3e3e3e3e",
  "isLive": true
}
```
## Success Response (200)
```json
{
  "success": true,
  "message": "Stream updated successfully",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "title": "Updated Match: Team A vs Team B",
    "team1": {
      "name": "Team A",
      "logo": "https://example.com/team-a-logo.png"
    },
    "team2": {
      "name": "Team B",
      "logo": "https://example.com/team-b-logo.png"
    },
    "date": "2023-12-15T18:00:00.000Z",
    "streamURL": "https://example.com/stream-url",
    "expiryTime": "2023-12-15T22:00:00.000Z",
    "category": {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "name": "Football",
      "slug": "football"
    },
    "isLive": true,
    "views": 1250,
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T13:45:12.345Z"
  }
}

```
## Delete Stream

**URL:** `/streams/:id`  
**Method:** `DELETE`  
**Auth Required:** ✅ Yes

### Example Request

```http
DELETE /streams/638a3e3e3e3e3e3e3e3e3e3e
Authorization: Bearer <token>
```
## Success Response `200`
```json
{
  "success": true,
  "message": "Stream deleted successfully"
}
```


## Toggle Stream Live Status

**URL:** `/streams/:id/toggle-live`  
**Method:** `PUT`  
**Auth Required:** ✅ Yes

### Success Response `200`
```json
{
  "success": true,
  "message": "Stream live status updated",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "title": "Match: Team A vs Team B",
    "team1": {
      "name": "Team A",
      "logo": "https://example.com/team-a-logo.png"
    },
    "team2": {
      "name": "Team B",
      "logo": "https://example.com/team-b-logo.png"
    },
    "date": "2023-12-15T18:00:00.000Z",
    "streamURL": "https://example.com/stream-url",
    "expiryTime": "2023-12-15T22:00:00.000Z",
    "category": {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "name": "Football",
      "slug": "football"
    },
    "isLive": false,
    "views": 1250,
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T13:45:12.345Z"
  }
}
```
# Categories
### Get All Categories

**URL:** `/categories`  
**Method:** `GET`  
**Auth Required:** Yes

---

#### Success Response (200)
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "name": "Football",
      "slug": "football",
      "description": "Football matches and highlights",
      "icon": "https://example.com/football-icon.png",
      "createdAt": "2023-12-01T12:34:56.789Z",
      "updatedAt": "2023-12-01T12:34:56.789Z"
    }
  ]
}
```
### Get Single Category

**URL:** `/categories/:id`  
**Method:** `GET`  
**Auth Required:** Yes

---

#### Success Response (200)
```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "name": "Football",
    "slug": "football",
    "description": "Football matches and highlights",
    "icon": "https://example.com/football-icon.png",
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T12:34:56.789Z"
  }
}
```
### Create Category

**URL:** `/categories`  
**Method:** `POST`  
**Auth Required:** Yes

---

#### Request Body

```json
{
  "name": "Football",
  "slug": "football",
  "description": "Football matches and highlights",
  "icon": "https://example.com/football-icon.png"
}
```
#### Success Response `(201)`:
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "name": "Football",
    "slug": "football",
    "description": "Football matches and highlights",
    "icon": "https://example.com/football-icon.png",
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T12:34:56.789Z"
  }
}
```
### Update Category

**URL:** `/categories/:id`  
**Method:** `PUT`  
**Auth Required:** Yes

---

#### Request Body

```json
{
  "name": "Football",
  "slug": "football",
  "description": "Football matches and highlights",
  "icon": "https://example.com/football-icon.png"
}
```
#### Success Response `200`
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "name": "Football",
    "slug": "football",
    "description": "Football matches and highlights",
    "icon": "https://example.com/football-icon.png",
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T13:45:12.345Z"
  }
}
```

### Delete Category

**URL:** `/categories/:id`  
**Method:** `DELETE`  
**Auth Required:** Yes

---

#### Success Response
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```
# Live TV Channels API

## Get All Live TV Channels

**URL:** `/live-tv`  
**Method:** `GET`  
**Auth Required:** ✅ Yes

### Query Parameters

| Name       | Type    | Default | Description                  |
|------------|---------|---------|------------------------------|
| `page`     | number  | 1       | Page number                  |
| `limit`    | number  | 10      | Items per page               |
| `search`   | string  | -       | Search term                  |
| `category` | string  | -       | Category ID                  |
| `isLive`   | boolean | -       | Filter by live status        |

#### Success Response 200

```json
{
  "success": true,
  "message": "Live TV channels retrieved successfully",
  "data": [
    {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "channelName": "Sports Channel 1",
      "logo": "https://example.com/channel-logo.png",
      "url": "https://example.com/channel-stream",
      "category": {
        "_id": "638a3e3e3e3e3e3e3e3e3e3e",
        "name": "Sports",
        "slug": "sports"
      },
      "isLive": true,
      "views": 8500,
      "description": "24/7 sports coverage",
      "createdAt": "2023-12-01T12:34:56.789Z",
      "updatedAt": "2023-12-01T12:34:56.789Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "pages": 2,
    "hasNext": true,
    "hasPrev": false
  }
}
```
## Get Single Live TV Channel

**URL:** `/live-tv/:id`  
**Method:** `GET`  
**Auth Required:** ✅ Yes

### Success Response (200):

```json
{
  "success": true,
  "message": "Live TV channel retrieved successfully",
  "data": {
    "_id": "638a3e3e3e3e3e3e3e3e3e3e",
    "channelName": "Sports Channel 1",
    "logo": "https://example.com/channel-logo.png",
    "url": "https://example.com/channel-stream",
    "category": {
      "_id": "638a3e3e3e3e3e3e3e3e3e3e",
      "name": "Sports",
      "slug": "sports"
    },
    "isLive": true,
    "views": 8500,
    "description": "24/7 sports coverage",
    "createdAt": "2023-12-01T12:34:56.789Z",
    "updatedAt": "2023-12-01T12:34:56.789Z"
  }
}
```
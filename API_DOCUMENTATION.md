# CricStream Admin API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Base URL & Authentication](#base-url--authentication)
3. [Response Format](#response-format)
4. [Authentication Endpoints](#authentication-endpoints)
5. [Category Endpoints](#category-endpoints)
6. [Stream Endpoints](#stream-endpoints)
7. [Live TV Endpoints](#live-tv-endpoints)
8. [Highlight Endpoints](#highlight-endpoints)
9. [Social Link Endpoints](#social-link-endpoints)
10. [Base URL Endpoints](#base-url-endpoints)
11. [Announcement Endpoints](#announcement-endpoints)
12. [Advertisement Endpoints](#advertisement-endpoints)
13. [Statistics Endpoints](#statistics-endpoints)
14. [Configuration Endpoints](#configuration-endpoints)
15. [Error Handling](#error-handling)

---

## Overview

The CricStream Admin API is a comprehensive backend service for managing sports streaming content, live TV channels, advertisements, and user management. Built with Node.js and Express.js, the API provides RESTful endpoints for CRUD operations on various resources with role-based access control.

**Tech Stack:**

- Node.js & Express.js
- MongoDB
- JWT Authentication
- Rate Limiting
- CORS Support

---

## Base URL & Authentication

### Base URL

```
http://localhost:5001/api
```

### Headers Required

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <your_jwt_token>"
}
```

### Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 requests per IP per window

### User Roles

- `admin` - Full system access
- `moderator` - Content management access

---

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "error_code"
}
```

---

## Authentication Endpoints

### Register User

**Endpoint:** `POST /auth/register`  
**Access:** Public  
**Rate Limited:** Yes

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "role": "moderator"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "role": "moderator"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**

- Email must be valid and unique
- Password must be at least 8 characters
- Role must be either 'admin' or 'moderator'

**Example Code (JavaScript):**

```javascript
const registerUser = async (email, password, role = "moderator") => {
  const response = await fetch("http://localhost:5001/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  });
  return response.json();
};

// Usage
registerUser("john@example.com", "SecurePass123!", "moderator")
  .then((data) => console.log(data))
  .catch((error) => console.error("Registration failed:", error));
```

**Example Code (Python):**

```python
import requests
import json

def register_user(email, password, role='moderator'):
    url = 'http://localhost:5001/api/auth/register'
    payload = {
        'email': email,
        'password': password,
        'role': role
    }
    response = requests.post(url, json=payload)
    return response.json()

# Usage
result = register_user('john@example.com', 'SecurePass123!', 'moderator')
print(result)
```

**Example Code (cURL):**

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "role": "moderator"
  }'
```

---

### Login User

**Endpoint:** `POST /auth/login`  
**Access:** Public  
**Rate Limited:** Yes

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "role": "moderator"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Example Code (JavaScript):**

```javascript
const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:5001/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem("authToken", data.data.token);
  }
  return data;
};

// Usage
loginUser("john@example.com", "SecurePass123!")
  .then((data) => {
    if (data.success) {
      console.log("Login successful");
      console.log("Token:", data.data.token);
    }
  })
  .catch((error) => console.error("Login failed:", error));
```

---

### Get Current User Profile

**Endpoint:** `GET /auth/me`  
**Access:** Private (requires valid JWT)  
**Required Headers:**

```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "moderator",
      "lastActive": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Example Code (JavaScript):**

```javascript
const getCurrentUser = async (token) => {
  const response = await fetch("http://localhost:5001/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Usage
const token = localStorage.getItem("authToken");
getCurrentUser(token)
  .then((data) => console.log("Current user:", data.data.user))
  .catch((error) => console.error("Error fetching user:", error));
```

---

### Update User Profile

**Endpoint:** `PUT /auth/profile`  
**Access:** Private (requires valid JWT)  
**Required Headers:**

```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "newemail@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "newemail@example.com",
      "role": "moderator",
      "lastActive": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Example Code (JavaScript):**

```javascript
const updateProfile = async (token, name, email) => {
  const response = await fetch("http://localhost:5001/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });
  return response.json();
};

// Usage
updateProfile(token, "John Doe", "newemail@example.com")
  .then((data) => console.log("Profile updated:", data.data.user))
  .catch((error) => console.error("Update failed:", error));
```

---

### Update Password

**Endpoint:** `PUT /auth/updatepassword`  
**Access:** Private (requires valid JWT)

**Request Body:**

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword456!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**Example Code (JavaScript):**

```javascript
const updatePassword = async (token, currentPassword, newPassword) => {
  const response = await fetch(
    "http://localhost:5001/api/auth/updatepassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    }
  );
  return response.json();
};
```

---

## Category Endpoints

### Get All Categories

**Endpoint:** `GET /categories`  
**Access:** Private (admin/moderator only)  
**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `sort` (string): Sort field (default: -createdAt)
- `search` (string): Search by category name

**Response (200):**

```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Cricket",
      "slug": "cricket",
      "description": "International and domestic cricket matches",
      "icon": "https://example.com/cricket-icon.png",
      "createdAt": "2024-01-10T08:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Football",
      "slug": "football",
      "description": "Soccer and football matches",
      "icon": "https://example.com/football-icon.png",
      "createdAt": "2024-01-11T08:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "pages": 1
  }
}
```

**Example Code (JavaScript):**

```javascript
const getCategories = async (token, page = 1, limit = 10, search = "") => {
  const params = new URLSearchParams({
    page,
    limit,
    search,
  });

  const response = await fetch(
    `http://localhost:5001/api/categories?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

// Usage
getCategories(token, 1, 10, "cricket")
  .then((data) => {
    console.log("Categories:", data.data);
    console.log("Pagination:", data.pagination);
  })
  .catch((error) => console.error("Error fetching categories:", error));
```

---

### Get Single Category

**Endpoint:** `GET /categories/:id`  
**Access:** Private (admin/moderator only)

**URL Parameters:**

- `id` (string): Category ID (MongoDB ObjectId)

**Response (200):**

```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Cricket",
    "slug": "cricket",
    "description": "International and domestic cricket matches",
    "icon": "https://example.com/cricket-icon.png",
    "createdAt": "2024-01-10T08:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Example Code (JavaScript):**

```javascript
const getCategory = async (token, categoryId) => {
  const response = await fetch(
    `http://localhost:5001/api/categories/${categoryId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
```

---

### Create Category

**Endpoint:** `POST /categories`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "name": "Cricket",
  "slug": "cricket",
  "description": "International and domestic cricket matches",
  "icon": "https://example.com/cricket-icon.png"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Cricket",
    "slug": "cricket",
    "description": "International and domestic cricket matches",
    "icon": "https://example.com/cricket-icon.png",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Example Code (JavaScript):**

```javascript
const createCategory = async (token, categoryData) => {
  const response = await fetch("http://localhost:5001/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

// Usage
const categoryData = {
  name: "Cricket",
  description: "International and domestic cricket matches",
  icon: "https://example.com/cricket-icon.png",
};

createCategory(token, categoryData)
  .then((data) => console.log("Category created:", data.data))
  .catch((error) => console.error("Creation failed:", error));
```

---

### Update Category

**Endpoint:** `PUT /categories/:id`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "name": "Cricket - Updated",
  "description": "Updated cricket category description",
  "icon": "https://example.com/new-cricket-icon.png"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Cricket - Updated",
    "slug": "cricket-updated",
    "description": "Updated cricket category description",
    "icon": "https://example.com/new-cricket-icon.png",
    "createdAt": "2024-01-10T08:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Example Code (JavaScript):**

```javascript
const updateCategory = async (token, categoryId, updates) => {
  const response = await fetch(
    `http://localhost:5001/api/categories/${categoryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );
  return response.json();
};
```

---

### Delete Category

**Endpoint:** `DELETE /categories/:id`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Example Code (JavaScript):**

```javascript
const deleteCategory = async (token, categoryId) => {
  const response = await fetch(
    `http://localhost:5001/api/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
```

---

## Stream Endpoints

### Get All Streams

**Endpoint:** `GET /streams`  
**Access:** Private (admin/moderator only)  
**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `sort` (string): Sort field (default: -createdAt)
- `search` (string): Search by title

**Response (200):**

```json
{
  "success": true,
  "message": "Streams retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "India vs Pakistan Cricket Match",
      "team1": {
        "name": "India",
        "logo": "https://example.com/india-logo.png"
      },
      "team2": {
        "name": "Pakistan",
        "logo": "https://example.com/pakistan-logo.png"
      },
      "date": "2024-01-20T14:00:00Z",
      "streamURL": "https://stream.example.com/india-pakistan",
      "expiryTime": "2024-01-20T20:00:00Z",
      "category": "507f1f77bcf86cd799439011",
      "isLive": true,
      "views": 15000,
      "createdAt": "2024-01-15T08:00:00Z",
      "updatedAt": "2024-01-20T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

**Example Code (JavaScript):**

```javascript
const getStreams = async (token, page = 1, limit = 10) => {
  const params = new URLSearchParams({ page, limit });
  const response = await fetch(`http://localhost:5001/api/streams?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
```

---

### Create Stream

**Endpoint:** `POST /streams`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "title": "India vs Pakistan Cricket Match",
  "team1": {
    "name": "India",
    "logo": "https://example.com/india-logo.png"
  },
  "team2": {
    "name": "Pakistan",
    "logo": "https://example.com/pakistan-logo.png"
  },
  "date": "2024-01-20T14:00:00Z",
  "streamURL": "https://stream.example.com/india-pakistan",
  "expiryTime": "2024-01-20T20:00:00Z",
  "category": "507f1f77bcf86cd799439011",
  "isLive": false
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Stream created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "India vs Pakistan Cricket Match",
    "team1": {
      "name": "India",
      "logo": "https://example.com/india-logo.png"
    },
    "team2": {
      "name": "Pakistan",
      "logo": "https://example.com/pakistan-logo.png"
    },
    "date": "2024-01-20T14:00:00Z",
    "streamURL": "https://stream.example.com/india-pakistan",
    "expiryTime": "2024-01-20T20:00:00Z",
    "category": "507f1f77bcf86cd799439011",
    "isLive": false,
    "views": 0,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Example Code (JavaScript):**

```javascript
const createStream = async (token, streamData) => {
  const response = await fetch("http://localhost:5001/api/streams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(streamData),
  });
  return response.json();
};

// Usage
const streamData = {
  title: "India vs Pakistan",
  team1: { name: "India", logo: "url" },
  team2: { name: "Pakistan", logo: "url" },
  date: new Date("2024-01-20T14:00:00Z"),
  streamURL: "https://stream.example.com/india-pakistan",
  expiryTime: new Date("2024-01-20T20:00:00Z"),
  category: "categoryId",
  isLive: false,
};

createStream(token, streamData)
  .then((res) => console.log("Stream created:", res.data))
  .catch((err) => console.error("Error:", err));
```

---

### Update Stream

**Endpoint:** `PUT /streams/:id`  
**Access:** Private (admin/moderator only)

**Request Body:** Same as Create Stream (partial updates allowed)

**Example Code (JavaScript):**

```javascript
const updateStream = async (token, streamId, updates) => {
  const response = await fetch(
    `http://localhost:5001/api/streams/${streamId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );
  return response.json();
};
```

---

### Toggle Stream Live Status

**Endpoint:** `PUT /streams/:id/toggle-live`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Stream live status toggled",
  "data": {
    "isLive": true
  }
}
```

**Example Code (JavaScript):**

```javascript
const toggleStreamLive = async (token, streamId) => {
  const response = await fetch(
    `http://localhost:5001/api/streams/${streamId}/toggle-live`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
```

---

### Delete Stream

**Endpoint:** `DELETE /streams/:id`  
**Access:** Private (admin/moderator only)

**Example Code (JavaScript):**

```javascript
const deleteStream = async (token, streamId) => {
  const response = await fetch(
    `http://localhost:5001/api/streams/${streamId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
```

---

## Live TV Endpoints

### Get All Live TV Channels

**Endpoint:** `GET /live-tv`  
**Access:** Private (admin/moderator only)

**Response Structure:** Similar to Streams

**Example Code (JavaScript):**

```javascript
const getLiveTvChannels = async (token, page = 1, limit = 10) => {
  const params = new URLSearchParams({ page, limit });
  const response = await fetch(`http://localhost:5001/api/live-tv?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
```

---

### Create Live TV Channel

**Endpoint:** `POST /live-tv`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "channelName": "Star Sports",
  "channelLogo": "https://example.com/star-sports-logo.png",
  "streamURL": "https://stream.example.com/star-sports",
  "description": "Live sports coverage",
  "isLive": true
}
```

**Example Code (JavaScript):**

```javascript
const createLiveTv = async (token, liveTvData) => {
  const response = await fetch("http://localhost:5001/api/live-tv", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(liveTvData),
  });
  return response.json();
};
```

---

### Toggle Live TV Channel Status

**Endpoint:** `PUT /live-tv/:id/toggle-live`  
**Access:** Private (admin/moderator only)

**Example Code (JavaScript):**

```javascript
const toggleLiveTvStatus = async (token, channelId) => {
  const response = await fetch(
    `http://localhost:5001/api/live-tv/${channelId}/toggle-live`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
```

---

## Highlight Endpoints

### Get All Highlights

**Endpoint:** `GET /highlights`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Highlights retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "title": "Best Catches of the Day",
      "description": "Watch the best catches from today's matches",
      "videoURL": "https://example.com/highlight-video.mp4",
      "thumbnailURL": "https://example.com/thumbnail.jpg",
      "duration": 300,
      "category": "507f1f77bcf86cd799439011",
      "views": 5000,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

---

### Create Highlight

**Endpoint:** `POST /highlights`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "title": "Best Catches of the Day",
  "description": "Watch the best catches from today's matches",
  "videoURL": "https://example.com/highlight-video.mp4",
  "thumbnailURL": "https://example.com/thumbnail.jpg",
  "duration": 300,
  "category": "507f1f77bcf86cd799439011"
}
```

**Example Code (JavaScript):**

```javascript
const createHighlight = async (token, highlightData) => {
  const response = await fetch("http://localhost:5001/api/highlights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(highlightData),
  });
  return response.json();
};
```

---

## Social Link Endpoints

### Get All Social Links

**Endpoint:** `GET /social-links`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Social links retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "platform": "facebook",
      "url": "https://facebook.com/cricstream",
      "icon": "https://example.com/facebook-icon.png",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

---

### Create Social Link

**Endpoint:** `POST /social-links`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "platform": "facebook",
  "url": "https://facebook.com/cricstream",
  "icon": "https://example.com/facebook-icon.png",
  "isActive": true
}
```

**Example Code (JavaScript):**

```javascript
const createSocialLink = async (token, socialData) => {
  const response = await fetch("http://localhost:5001/api/social-links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(socialData),
  });
  return response.json();
};
```

---

### Toggle Social Link Status

**Endpoint:** `PUT /social-links/:id/toggle-active`  
**Access:** Private (admin/moderator only)

**Example Code (JavaScript):**

```javascript
const toggleSocialLinkStatus = async (token, socialLinkId) => {
  const response = await fetch(
    `http://localhost:5001/api/social-links/${socialLinkId}/toggle-active`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
```

---

## Base URL Endpoints

### Get All Base URLs

**Endpoint:** `GET /base-urls`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Base URLs retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "name": "Production Server",
      "baseURL": "https://api.cricstream.com",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Base URL

**Endpoint:** `POST /base-urls`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "name": "Production Server",
  "baseURL": "https://api.cricstream.com",
  "isActive": true
}
```

**Example Code (JavaScript):**

```javascript
const createBaseUrl = async (token, baseUrlData) => {
  const response = await fetch("http://localhost:5001/api/base-urls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(baseUrlData),
  });
  return response.json();
};
```

---

### Toggle Base URL Status

**Endpoint:** `PUT /base-urls/:id/toggle-active`  
**Access:** Private (admin/moderator only)

---

## Announcement Endpoints

### Get All Announcements

**Endpoint:** `GET /announcements`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Announcements retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439060",
      "title": "New Feature: HD Streaming",
      "content": "We now support HD streaming for all users",
      "type": "info",
      "isActive": true,
      "expiryDate": "2024-02-15T23:59:59Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Announcement

**Endpoint:** `POST /announcements`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "title": "New Feature: HD Streaming",
  "content": "We now support HD streaming for all users",
  "type": "info",
  "isActive": true,
  "expiryDate": "2024-02-15T23:59:59Z"
}
```

**Example Code (JavaScript):**

```javascript
const createAnnouncement = async (token, announcementData) => {
  const response = await fetch("http://localhost:5001/api/announcements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(announcementData),
  });
  return response.json();
};

// Usage
const announcementData = {
  title: "New Feature: HD Streaming",
  content: "We now support HD streaming for all users",
  type: "info",
  isActive: true,
  expiryDate: new Date("2024-02-15T23:59:59Z"),
};

createAnnouncement(token, announcementData)
  .then((res) => console.log("Announcement created:", res.data))
  .catch((err) => console.error("Error:", err));
```

---

### Toggle Announcement Status

**Endpoint:** `PUT /announcements/:id/toggle-active`  
**Access:** Private (admin/moderator only)

---

## Advertisement Endpoints

### Get All Advertisements

**Endpoint:** `GET /ads`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Ads retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439070",
      "type": "banner",
      "title": "Premium Membership",
      "content": "Upgrade to Premium for ad-free streaming",
      "isActive": true,
      "position": "header",
      "clickCount": 150,
      "viewCount": 5000,
      "expiryDate": "2024-02-15T23:59:59Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Advertisement

**Endpoint:** `POST /ads`  
**Access:** Private (admin/moderator only)

**Request Body:**

```json
{
  "type": "banner",
  "title": "Premium Membership",
  "content": "Upgrade to Premium for ad-free streaming",
  "isActive": true,
  "position": "header",
  "expiryDate": "2024-02-15T23:59:59Z"
}
```

**Supported Types:** `direct`, `banner`  
**Supported Positions:** `header`, `sidebar`, `footer`, `in-stream`

**Example Code (JavaScript):**

```javascript
const createAd = async (token, adData) => {
  const response = await fetch("http://localhost:5001/api/ads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(adData),
  });
  return response.json();
};

// Usage
const adData = {
  type: "banner",
  title: "Premium Membership",
  content: "Upgrade to Premium for ad-free streaming",
  isActive: true,
  position: "header",
  expiryDate: new Date("2024-02-15T23:59:59Z"),
};

createAd(token, adData)
  .then((res) => console.log("Ad created:", res.data))
  .catch((err) => console.error("Error:", err));
```

---

### Increment Ad Click Count (Public)

**Endpoint:** `PUT /ads/:id/click`  
**Access:** Public

**Request Body:**

```json
{}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Click count incremented",
  "data": {
    "clickCount": 151
  }
}
```

**Example Code (JavaScript):**

```javascript
const trackAdClick = async (adId) => {
  const response = await fetch(`http://localhost:5001/api/ads/${adId}/click`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Usage - Call this when user clicks on an ad
trackAdClick(adId)
  .then((res) => console.log("Click tracked:", res.data))
  .catch((err) => console.error("Error:", err));
```

---

### Increment Ad View Count (Public)

**Endpoint:** `PUT /ads/:id/view`  
**Access:** Public

**Request Body:**

```json
{}
```

**Response (200):**

```json
{
  "success": true,
  "message": "View count incremented",
  "data": {
    "viewCount": 5001
  }
}
```

**Example Code (JavaScript):**

```javascript
const trackAdView = async (adId) => {
  const response = await fetch(`http://localhost:5001/api/ads/${adId}/view`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Usage - Call this when ad is displayed to user
trackAdView(adId)
  .then((res) => console.log("View tracked:", res.data))
  .catch((err) => console.error("Error:", err));
```

---

### Toggle Advertisement Status

**Endpoint:** `PUT /ads/:id/toggle-active`  
**Access:** Private (admin/moderator only)

---

## Statistics Endpoints

### Get Dashboard Statistics

**Endpoint:** `GET /stats/dashboard`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "totalStreams": 45,
    "activeStreams": 12,
    "totalLiveChannels": 8,
    "totalHighlights": 156,
    "totalAds": 23,
    "totalAnnouncements": 15,
    "totalUsers": 5000,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Example Code (JavaScript):**

```javascript
const getDashboardStats = async (token) => {
  const response = await fetch("http://localhost:5001/api/stats/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Usage
getDashboardStats(token)
  .then((res) => {
    console.log("Dashboard stats:", res.data);
  })
  .catch((err) => console.error("Error:", err));
```

---

### Get User Statistics

**Endpoint:** `GET /stats/users`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "User stats retrieved successfully",
  "data": {
    "totalUsers": 5000,
    "activeUsers": 1200,
    "newUsersThisMonth": 340,
    "adminCount": 5,
    "moderatorCount": 15
  }
}
```

---

### Get Content Statistics

**Endpoint:** `GET /stats/content`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Content stats retrieved successfully",
  "data": {
    "totalStreams": 45,
    "activeStreams": 12,
    "totalViews": 250000,
    "totalHighlights": 156,
    "averageStreamDuration": 180
  }
}
```

---

### Get Advertisement Statistics

**Endpoint:** `GET /stats/ads`  
**Access:** Private (admin/moderator only)

**Response (200):**

```json
{
  "success": true,
  "message": "Ad stats retrieved successfully",
  "data": {
    "totalAds": 23,
    "activeAds": 8,
    "totalClicks": 5420,
    "totalViews": 145000,
    "ctr": 3.74,
    "topAdById": "507f1f77bcf86cd799439070"
  }
}
```

**Example Code (JavaScript):**

```javascript
const getAdStats = async (token) => {
  const response = await fetch("http://localhost:5001/api/stats/ads", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
```

---

## Configuration Endpoints

### Get App Name

**Endpoint:** `GET /config/app-name`  
**Access:** Public

**Response (200):**

```json
{
  "success": true,
  "message": "App name retrieved successfully",
  "data": {
    "appName": "CricStream Admin"
  }
}
```

**Example Code (JavaScript):**

```javascript
const getAppName = async () => {
  const response = await fetch("http://localhost:5001/api/config/app-name");
  return response.json();
};
```

---

### Update App Name

**Endpoint:** `PUT /config/app-name`  
**Access:** Private (admin only)

**Request Body:**

```json
{
  "appName": "CricStream Pro"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "App name updated successfully",
  "data": {
    "appName": "CricStream Pro"
  }
}
```

**Example Code (JavaScript):**

```javascript
const updateAppName = async (token, newAppName) => {
  const response = await fetch("http://localhost:5001/api/config/app-name", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ appName: newAppName }),
  });
  return response.json();
};
```

---

## Health Check Endpoint

### API Health Status

**Endpoint:** `GET /health`  
**Access:** Public

**Response (200):**

```json
{
  "status": "OK",
  "message": "API is running"
}
```

**Example Code (JavaScript):**

```javascript
const checkApiHealth = async () => {
  const response = await fetch("http://localhost:5001/api/health");
  return response.json();
};
```

---

## Error Handling

### Common Error Responses

**400 - Bad Request:**

```json
{
  "success": false,
  "message": "Validation error",
  "error": "Invalid request body"
}
```

**401 - Unauthorized:**

```json
{
  "success": false,
  "message": "Unauthorized access",
  "error": "Invalid or missing token"
}
```

**403 - Forbidden:**

```json
{
  "success": false,
  "message": "Access forbidden",
  "error": "User role does not have permission"
}
```

**404 - Not Found:**

```json
{
  "success": false,
  "message": "Resource not found",
  "error": "The requested resource does not exist"
}
```

**500 - Internal Server Error:**

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "An unexpected error occurred"
}
```

### Error Handling Example (JavaScript)

```javascript
const handleApiError = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 400:
        console.error("Bad Request:", error.message);
        break;
      case 401:
        console.error("Unauthorized:", error.message);
        // Redirect to login
        break;
      case 403:
        console.error("Forbidden:", error.message);
        break;
      case 404:
        console.error("Not Found:", error.message);
        break;
      case 500:
        console.error("Server Error:", error.message);
        break;
      default:
        console.error("Unknown error:", error.message);
    }
    throw new Error(error.message);
  }
  return response.json();
};

// Usage
const apiCall = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  return handleApiError(response);
};
```

---

## Complete API Client Example

```javascript
// api-client.js - Reusable API client class

class CricStreamApiClient {
  constructor(baseURL = "http://localhost:5001/api", token = null) {
    this.baseURL = baseURL;
    this.token = token;
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    return response.json();
  }

  // Auth endpoints
  async register(email, password, role = "moderator") {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });
  }

  async login(email, password) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.data.token);
    return response;
  }

  async getMe() {
    return this.request("/auth/me");
  }

  // Category endpoints
  async getCategories(page = 1, limit = 10) {
    return this.request(`/categories?page=${page}&limit=${limit}`);
  }

  async createCategory(categoryData) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(categoryId, updates) {
    return this.request(`/categories/${categoryId}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  // Stream endpoints
  async getStreams(page = 1, limit = 10) {
    return this.request(`/streams?page=${page}&limit=${limit}`);
  }

  async createStream(streamData) {
    return this.request("/streams", {
      method: "POST",
      body: JSON.stringify(streamData),
    });
  }

  async toggleStreamLive(streamId) {
    return this.request(`/streams/${streamId}/toggle-live`, {
      method: "PUT",
    });
  }

  // Ad endpoints
  async getAds(page = 1, limit = 10) {
    return this.request(`/ads?page=${page}&limit=${limit}`);
  }

  async trackAdClick(adId) {
    return this.request(`/ads/${adId}/click`, {
      method: "PUT",
    });
  }

  async trackAdView(adId) {
    return this.request(`/ads/${adId}/view`, {
      method: "PUT",
    });
  }

  // Stats endpoints
  async getDashboardStats() {
    return this.request("/stats/dashboard");
  }

  async getAdStats() {
    return this.request("/stats/ads");
  }
}

// Usage Example
const apiClient = new CricStreamApiClient();

(async () => {
  try {
    // Login
    const loginResponse = await apiClient.login(
      "admin@example.com",
      "password123"
    );
    console.log("Logged in successfully");

    // Get categories
    const categoriesResponse = await apiClient.getCategories(1, 10);
    console.log("Categories:", categoriesResponse.data);

    // Create a stream
    const streamData = {
      title: "India vs Australia",
      team1: { name: "India", logo: "url" },
      team2: { name: "Australia", logo: "url" },
      date: new Date(),
      streamURL: "https://stream.example.com",
      expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
      category: "categoryId",
      isLive: false,
    };
    const streamResponse = await apiClient.createStream(streamData);
    console.log("Stream created:", streamResponse.data);

    // Get dashboard stats
    const statsResponse = await apiClient.getDashboardStats();
    console.log("Dashboard stats:", statsResponse.data);
  } catch (error) {
    console.error("API Error:", error.message);
  }
})();
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cricstream-admin?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

---

## Best Practices

1. **Always include the Authorization header** when making authenticated requests
2. **Store JWT tokens securely** using localStorage or secure HTTP-only cookies
3. **Implement proper error handling** on the client side
4. **Use pagination** for list endpoints to improve performance
5. **Cache responses** where appropriate to reduce server load
6. **Implement retry logic** for failed requests
7. **Validate user input** before sending to the API
8. **Use HTTPS** in production environments
9. **Implement request debouncing** for rapid API calls
10. **Monitor API response times** for performance optimization

---

## Version History

- **v1.0.0** (2024-01-15) - Initial API release with all core endpoints

---

## Support

For API support and documentation updates, contact the development team or visit the internal documentation portal.

# Sports Streaming Admin API Documentation

## Overview
This is a RESTful API for managing a sports streaming platform with admin dashboard functionality. The API provides endpoints for authentication, content management, and configuration.

**Base URL:** `https://cricstream-admin.onrender.com/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": true|false,
  "message": "Response message",
  "data": {}, // Optional data object
  "pagination": {} // Optional pagination info
}
```

## Error Responses
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Endpoints

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /auth/register
Register a new user (admin only).

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "moderator"
}
```

### GET /auth/me
Get current user information.

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "lastActive": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### PUT /auth/profile
Update user profile (name and email).

**Headers:** Authorization required

**Request Body:**
```json
{
  "name": "New Name",
  "email": "newemail@example.com"
}
```

### PUT /auth/updatepassword
Update user password.

**Headers:** Authorization required

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

---

## Configuration Endpoints

### GET /config/app-name
Get application name.

**Response:**
```json
{
  "success": true,
  "message": "App name fetched",
  "data": {
    "appName": "Sports Admin"
  }
}
```

### PUT /config/app-name
Update application name (admin only).

**Headers:** Authorization required

**Request Body:**
```json
{
  "appName": "New App Name"
}
```

---

## Categories Endpoints

### GET /categories
Get all categories with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search term
- `isActive` (boolean): Filter by active status

**Response:**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "_id": "category_id",
      "name": "Football",
      "description": "Football matches",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "pages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### POST /categories
Create a new category.

**Headers:** Authorization required

**Request Body:**
```json
{
  "name": "Basketball",
  "description": "Basketball matches",
  "isActive": true
}
```

### PUT /categories/:id
Update a category.

**Headers:** Authorization required

**Request Body:**
```json
{
  "name": "Updated Basketball",
  "description": "Updated description",
  "isActive": false
}
```

### DELETE /categories/:id
Delete a category.

**Headers:** Authorization required

---

## Streams Endpoints

### GET /streams
Get all streams with pagination and filtering.

**Query Parameters:**
- `page`, `limit`, `search`, `isActive`
- `category` (string): Filter by category ID

**Response:**
```json
{
  "success": true,
  "message": "Streams retrieved successfully",
  "data": [
    {
      "_id": "stream_id",
      "title": "Match Title",
      "description": "Match description",
      "streamUrl": "https://stream.example.com",
      "category": "category_id",
      "isActive": true,
      "viewCount": 100,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /streams
Create a new stream.

**Headers:** Authorization required

**Request Body:**
```json
{
  "title": "Live Match",
  "description": "Live football match",
  "streamUrl": "https://stream.example.com",
  "category": "category_id",
  "isActive": true
}
```

### PUT /streams/:id
Update a stream.

**Headers:** Authorization required

### DELETE /streams/:id
Delete a stream.

**Headers:** Authorization required

---

## Live TV Endpoints

### GET /live-tv
Get all live TV channels.

**Query Parameters:** `page`, `limit`, `search`, `isActive`

**Response:**
```json
{
  "success": true,
  "message": "Live TV channels retrieved successfully",
  "data": [
    {
      "_id": "channel_id",
      "name": "Sports Channel",
      "description": "24/7 Sports",
      "streamUrl": "https://tv.example.com",
      "logo": "https://logo.example.com",
      "isActive": true,
      "viewCount": 500,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /live-tv
Create a new live TV channel.

**Headers:** Authorization required

**Request Body:**
```json
{
  "name": "New Sports Channel",
  "description": "Channel description",
  "streamUrl": "https://tv.example.com",
  "logo": "https://logo.example.com",
  "isActive": true
}
```

### PUT /live-tv/:id
Update a live TV channel.

**Headers:** Authorization required

### DELETE /live-tv/:id
Delete a live TV channel.

**Headers:** Authorization required

---

## Highlights Endpoints

### GET /highlights
Get all highlights.

**Query Parameters:** `page`, `limit`, `search`, `isActive`

**Response:**
```json
{
  "success": true,
  "message": "Highlights retrieved successfully",
  "data": [
    {
      "_id": "highlight_id",
      "title": "Match Highlights",
      "description": "Best moments",
      "videoUrl": "https://video.example.com",
      "thumbnail": "https://thumb.example.com",
      "duration": 300,
      "isActive": true,
      "viewCount": 1000,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /highlights
Create a new highlight.

**Headers:** Authorization required

**Request Body:**
```json
{
  "title": "Amazing Goals",
  "description": "Top goals compilation",
  "videoUrl": "https://video.example.com",
  "thumbnail": "https://thumb.example.com",
  "duration": 600,
  "isActive": true
}
```

### PUT /highlights/:id
Update a highlight.

**Headers:** Authorization required

### DELETE /highlights/:id
Delete a highlight.

**Headers:** Authorization required

---

## Social Links Endpoints

### GET /social-links
Get all social media links.

**Query Parameters:** `page`, `limit`, `search`, `isActive`

**Response:**
```json
{
  "success": true,
  "message": "Social links retrieved successfully",
  "data": [
    {
      "_id": "social_id",
      "platform": "Facebook",
      "url": "https://facebook.com/page",
      "icon": "https://icon.example.com",
      "isActive": true,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /social-links
Create a new social link.

**Headers:** Authorization required

**Request Body:**
```json
{
  "platform": "Twitter",
  "url": "https://twitter.com/page",
  "icon": "https://icon.example.com",
  "isActive": true,
  "order": 2
}
```

### PUT /social-links/:id
Update a social link.

**Headers:** Authorization required

### DELETE /social-links/:id
Delete a social link.

**Headers:** Authorization required

---

## Base URLs Endpoints

### GET /base-urls
Get all base URLs.

**Query Parameters:** `page`, `limit`, `search`, `isActive`

**Response:**
```json
{
  "success": true,
  "message": "Base URLs retrieved successfully",
  "data": [
    {
      "_id": "baseurl_id",
      "url": "https://api.example.com",
      "description": "Main API endpoint",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /base-urls
Create a new base URL.

**Headers:** Authorization required

**Request Body:**
```json
{
  "url": "https://cdn.example.com",
  "description": "CDN endpoint",
  "isActive": true
}
```

### PUT /base-urls/:id
Update a base URL.

**Headers:** Authorization required

### DELETE /base-urls/:id
Delete a base URL.

**Headers:** Authorization required

---

## Announcements Endpoints

### GET /announcements
Get all announcements.

**Query Parameters:** `page`, `limit`, `search`, `isActive`

**Response:**
```json
{
  "success": true,
  "message": "Announcements retrieved successfully",
  "data": [
    {
      "_id": "announcement_id",
      "title": "System Maintenance",
      "message": "Scheduled maintenance tonight",
      "isActive": true,
      "priority": 1,
      "expiryDate": "2024-12-31T23:59:59.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /announcements
Create a new announcement.

**Headers:** Authorization required

**Request Body:**
```json
{
  "title": "New Feature",
  "message": "Check out our new streaming feature",
  "isActive": true,
  "priority": 0,
  "expiryDate": "2024-12-31T23:59:59.000Z"
}
```

### PUT /announcements/:id
Update an announcement.

**Headers:** Authorization required

### DELETE /announcements/:id
Delete an announcement.

**Headers:** Authorization required

---

## Advertisements Endpoints

### GET /ads
Get all advertisements.

**Query Parameters:** `page`, `limit`, `search`, `isActive`, `type`, `position`

**Response:**
```json
{
  "success": true,
  "message": "Advertisements retrieved successfully",
  "data": [
    {
      "_id": "ad_id",
      "type": "direct",
      "title": "Promotional Ad",
      "content": "https://ad.example.com",
      "position": "header",
      "isActive": true,
      "clickCount": 50,
      "viewCount": 1000,
      "expiryDate": "2024-12-31T23:59:59.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /ads
Create a new advertisement.

**Headers:** Authorization required

**Request Body:**
```json
{
  "type": "banner",
  "title": "Banner Ad",
  "content": "<div>Banner HTML</div>",
  "position": "sidebar",
  "isActive": true,
  "expiryDate": "2024-12-31T23:59:59.000Z"
}
```

### PUT /ads/:id
Update an advertisement.

**Headers:** Authorization required

### DELETE /ads/:id
Delete an advertisement.

**Headers:** Authorization required

---

## Statistics Endpoints

### GET /stats/dashboard
Get dashboard statistics (admin/moderator only).

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "totalStreams": 100,
    "totalCategories": 10,
    "totalLiveTV": 5,
    "totalHighlights": 50,
    "totalUsers": 1000,
    "totalViews": 50000
  }
}
```

### GET /stats/users
Get user statistics (admin/moderator only).

**Headers:** Authorization required

### GET /stats/content
Get content statistics (admin/moderator only).

**Headers:** Authorization required

### GET /stats/ads
Get advertisement statistics (admin/moderator only).

**Headers:** Authorization required

---

## Health Check

### GET /health
Check API health status.

**Response:**
```json
{
  "status": "OK",
  "message": "API is running"
}
```

---

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.

## Authentication Flow

1. Login with email/password to get JWT token
2. Include token in Authorization header for protected endpoints
3. Token expires after 30 days (configurable)
4. Use refresh token or re-login when token expires

## User Roles

- **admin**: Full access to all endpoints
- **moderator**: Limited access to content management endpoints

## Data Models

### User
```json
{
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "role": "admin|moderator",
  "lastActive": "date"
}
```

### Category
```json
{
  "name": "string",
  "description": "string",
  "isActive": "boolean"
}
```

### Stream
```json
{
  "title": "string",
  "description": "string",
  "streamUrl": "string",
  "category": "objectId",
  "isActive": "boolean",
  "viewCount": "number"
}
```

### LiveTV
```json
{
  "name": "string",
  "description": "string",
  "streamUrl": "string",
  "logo": "string",
  "isActive": "boolean",
  "viewCount": "number"
}
```

### Highlight
```json
{
  "title": "string",
  "description": "string",
  "videoUrl": "string",
  "thumbnail": "string",
  "duration": "number",
  "isActive": "boolean",
  "viewCount": "number"
}
```

### SocialLink
```json
{
  "platform": "string",
  "url": "string",
  "icon": "string",
  "isActive": "boolean",
  "order": "number"
}
```

### BaseURL
```json
{
  "url": "string",
  "description": "string",
  "isActive": "boolean"
}
```

### Announcement
```json
{
  "title": "string",
  "message": "string",
  "isActive": "boolean",
  "priority": "number",
  "expiryDate": "date"
}
```

### Advertisement
```json
{
  "type": "direct|banner",
  "title": "string",
  "content": "string",
  "position": "header|sidebar|footer|in-stream",
  "isActive": "boolean",
  "clickCount": "number",
  "viewCount": "number",
  "expiryDate": "date"
}
```

### AppConfig
```json
{
  "key": "string (unique)",
  "value": "mixed"
}
```

---

## Development Setup

1. Install dependencies: `npm install`
2. Set environment variables in `.env`
3. Start server: `npm run dev`
4. API will be available at `https://cricstream-admin.onrender.com/api`

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sports-admin
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
```

## Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints. Make sure to include proper headers and authentication tokens for protected routes.

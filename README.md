# Campus Notifications System

A React + Material UI application developed as part of the Campus Hiring Evaluation. The application enables students to view campus notifications, track important updates, and prioritize critical notifications based on type and recency.

---

## Overview

This project consists of two major deliverables:

### 1. Logging Middleware

A reusable logging utility that sends structured logs to the evaluation server.

javascript Log(stack, level, packageName, message); 

The middleware is integrated throughout the application to capture:

- Application startup events
- API requests and responses
- State updates
- User interactions
- Error handling
- Page navigation events

---

### 2. Campus Notifications Frontend

A responsive React application that displays notifications received from the provided API and allows users to:

- View all notifications
- Filter notifications by type
- Track read and unread notifications
- View top priority notifications
- Paginate through notifications
- Experience responsive desktop and mobile layouts

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Material UI (MUI)
- Axios
- JavaScript (ES6+)

### Utilities

- Local Storage
- Custom Logging Middleware

---

## Project Structure

text src │ ├── api │   └── notificationsApi.js │ ├── components │   ├── NotificationCard.jsx │   ├── NotificationList.jsx │   ├── FilterBar.jsx │   └── PrioritySelector.jsx │ ├── pages │   ├── AllNotifications.jsx │   └── PriorityNotifications.jsx │ ├── services │   └── logger.js │ ├── context │   └── NotificationContext.jsx │ ├── utils │   ├── priorityUtils.js │   └── constants.js │ ├── App.jsx ├── main.jsx └── routes.jsx 

---

## Features

### Notification Management

- Fetch notifications from protected API
- Display all notifications
- Pagination support
- Notification filtering

### Priority Inbox

Displays top N notifications based on:

#### Priority Weight

| Type | Weight |
|--------|----------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

#### Secondary Sorting

If two notifications have the same weight, the newer notification receives higher priority.

---

### Read / Unread Tracking

Notifications viewed by the user are stored in Local Storage.

Unread notifications are visually highlighted for better user experience.

---

### Logging Middleware

Structured logging implemented across:

- API layer
- Components
- Pages
- State management
- Error handling

Example:

javascript Log(   "frontend",   "info",   "api",   "Fetching notifications" ); 

---

## Notification API

### Fetch Notifications

http GET /evaluation-service/notifications 

### Headers

http Authorization: Bearer <token> 

### Supported Query Parameters

| Parameter | Description |
|------------|------------|
| page | Page number |
| limit | Number of records |
| notification_type | Event / Result / Placement |

Example:

http /notifications?page=1&limit=10  /notifications?notification_type=Placement  /notifications?page=2&limit=20&notification_type=Result 

---

## Priority Calculation Approach

### Algorithm

1. Assign weight based on notification type.
2. Sort by weight in descending order.
3. If weights are equal, sort by timestamp in descending order.
4. Return top N notifications.

### Time Complexity

text Sorting: O(n log n)  Top N Selection: O(n) 

---

## Installation

### Clone Repository

bash git clone <repository-url> 

### Navigate to Project

bash cd campus-notifications 

### Install Dependencies

bash npm install 

### Start Development Server

bash npm run dev 

Application runs on:

text http://localhost:3000 

---

## Screenshots

### Home Page

Home Page

<img width="1469" height="883" alt="image" src="https://github.com/user-attachments/assets/e0cb8b0e-44df-431e-a8cf-c8ad51c60d0e" />


### Notifications Listing

Notifications

<img width="1469" height="883" alt="image" src="https://github.com/user-attachments/assets/e8403baf-d0f8-48b0-b4b3-347c7f679ca2" />


### Priority Inbox

<img width="1458" height="878" alt="image" src="https://github.com/user-attachments/assets/336adf4e-ff24-49e9-abba-303cc433a3fa" />

### Postman response

<img width="1468" height="917" alt="image" src="https://github.com/user-attachments/assets/842db04c-5dad-4c99-8f7b-b3d7ada9d3d9" />

## Error Handling

The application handles:

- Network failures
- Unauthorized API access
- Empty API responses
- Invalid query parameters
- Unexpected runtime exceptions

All critical failures are captured through the logging middleware.

---

## Future Improvements

- Real-time notifications using WebSockets
- Push notifications
- Advanced search functionality
- User-specific notification preferences
- Notification grouping and categorization

---

## Author

Submitted as part of the Campus Hiring Evaluation.

---

## License

This repository is intended solely for evaluation purposes.

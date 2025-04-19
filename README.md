# Full Stack Authentication Application

This project demonstrates a full-stack authentication system using SvelteKit for the frontend and Node.js/Express for the backend.

## Project Structure

```
├── frontend/           # SvelteKit application
│   ├── src/
│   │   ├── lib/       # Shared utilities
│   │   │   ├── services/auth.js      # Authentication API calls
│   │   │   ├── stores/authStore.js   # Svelte store for auth state
│   │   │   └── config/env.server.js  # Server environment configuration
│   │   ├── routes/    # SvelteKit routes
│   │   └── hooks.server.js           # Server-side auth middleware
│   └── components/
│       └── AuthForm.svelte           # Login/Register form component
│
└── backend/           # Express server
    ├── database/      # Database related code
    │   ├── models/User.js           # Mongoose user model
    │   ├── users/users.js           # User database operations
    │   └── db.js                    # MongoDB connection
    ├── routers/
    │   └── authRouter.js            # Authentication routes
    ├── util/
    │   ├── auth.js                  # JWT and password utilities
    │   ├── cors.js                  # CORS configuration
    │   ├── logger.js                # Logger utility 
    │   └── rateLimit.js             # Rate limiting middleware
    │
    └── app.js                       # Express application setup 
```

## Authentication Flow

### 1. User Registration
- User submits registration form (`AuthForm.svelte`)
- Frontend validates input using Zod schema
- Request sent to `/auth/register` endpoint
- Backend checks if username/email exists
- If valid, password is hashed using bcrypt
- JWT token is generated and sent in HTTP-only cookie
- User is redirected to dashboard

### 2. User Login
- User submits login form
- Frontend validates input using Zod schema
- Frontend sends credentials to `/auth/login`
- Backend verifies username and password
- If valid, JWT token is generated and set in cookie
- User is redirected to dashboard

### 3. Authentication State
- JWT token is stored in HTTP-only cookie
- `hooks.server.js` validates token on protected routes
- Client-side auth state managed by `authStore.js`
- Protected routes redirect to login if no valid token

### 4. Protected Routes
- `/dashboard` and `/settings` require authentication
- Server-side middleware checks JWT token
- Invalid/expired tokens redirect to login page

## Key Components

### Frontend

#### `AuthForm.svelte`
- Handles both login and registration
- Uses Zod for input validation
- Displays validation errors
- Manages form submission and API calls

#### `auth.js` (Frontend Service)
- Provides login/register/logout functions
- Handles API communication with backend
- Manages authentication cookies

#### `hooks.server.js`
- SvelteKit server hooks
- Protects routes requiring authentication
- Validates JWT tokens
- Redirects unauthorized access

### Backend

#### `authRouter.js`
- Express routes for auth operations
- Handles registration and login logic
- Manages JWT token generation
- Sets secure cookie options

#### `auth.js` (Backend Utility)
- Password hashing with bcrypt
- JWT token generation and verification
- Secure token payload management

#### `User.js` Model
- Mongoose schema for user data
- Defines required fields and validation
- Handles username/email uniqueness

## Security Features

- Passwords hashed using bcrypt
- JWT tokens for session management
- HTTP-only cookies prevent XSS
- CORS configuration for security
- Rate limiting on auth endpoints
- Server-side validation
- Protected route middleware

## Environment Configuration

Required environment variables:
- `JWT_SECRET`: Secret key for JWT tokens
- `FRONTEND_URL`: Allowed origin for CORS
- `NODE_ENV`: Environment mode (development/production)

## API Endpoints

- `POST /auth/register`: Create new user account
- `POST /auth/login`: Authenticate user
- `GET /auth/logout`: Clear authentication

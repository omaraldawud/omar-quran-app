# JWT Migration Guide: Session to JWT Authentication

## Overview
This guide will help you migrate from PHP session-based authentication to JWT (JSON Web Token) authentication. The migration is designed to be done incrementally with minimal disruption.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Phase 1: Backend Setup](#phase-1-backend-setup)
3. [Phase 2: Frontend Migration](#phase-2-frontend-migration)
4. [Phase 3: Testing](#phase-3-testing)
5. [Phase 4: Deployment](#phase-4-deployment)
6. [Rollback Plan](#rollback-plan)
7. [Key Differences Summary](#key-differences-summary)

---

## Prerequisites

### Required Knowledge
- PHP 7.4+ installed
- Understanding of HTTP headers
- Basic JWT concepts
- React/JavaScript localStorage

### Before You Start
1. **Backup your database** (especially the `users` table)
2. **Backup all existing PHP files**
3. **Test in development environment first**
4. Keep existing session files for rollback capability

---

## Phase 1: Backend Setup

### Step 1.1: Upload New JWT Files to Server

Upload these files to your `/api` directory:

```
/api/
├── jwt_config.php         # JWT configuration
├── jwt_helper.php         # JWT encoding/decoding utilities
├── jwt_middleware.php     # Reusable auth middleware
├── jwt_login.php          # JWT login endpoint
├── jwt_auth.php          # JWT auth check endpoint
├── jwt_refresh.php       # Token refresh endpoint
├── jwt_logout.php        # JWT logout endpoint
└── jwt_users.php         # Example protected endpoint
```

### Step 1.2: Generate Secure JWT Secret

**CRITICAL SECURITY STEP**

Run this command in your terminal:
```bash
php jwt_config.php
```

This will output a secure random string. Copy it.

### Step 1.3: Configure JWT Secret

Open `jwt_config.php` and replace the JWT_SECRET:

```php
// PRODUCTION: Use environment variable
define('JWT_SECRET', 'YOUR_GENERATED_SECRET_HERE');

// Or better yet, in production use:
define('JWT_SECRET', getenv('JWT_SECRET'));
```

**Important:** Never commit the actual secret to version control!

### Step 1.4: Test Backend Endpoints

Test each endpoint with a tool like Postman or curl:

#### Test Login:
```bash
curl -X POST http://localhost/api/jwt_login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

Expected response:
```json
{
  "success": true,
  "user": {...},
  "access_token": "eyJ0eXAiOiJKV1QiLCJh...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJh...",
  "expires_in": 3600
}
```

#### Test Auth Check:
```bash
curl -X GET http://localhost/api/jwt_auth.php \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

Expected response:
```json
{
  "authenticated": true,
  "user": {...}
}
```

### Step 1.5: Keep Old Session Files (For Now)

**DO NOT DELETE** these files yet:
- `login.php`
- `auth.php`
- `logout.php`
- `session_config.php`

You'll remove them after successful migration.

---

## Phase 2: Frontend Migration

### Step 2.1: Install Dependencies (if using axios)

```bash
npm install axios
```

Or continue using fetch (no installation needed).

### Step 2.2: Add Utility Files

Copy these files to your React project:

```
src/
├── utils/
│   ├── auth.js            # Token management utilities
│   └── axiosConfig.js     # Axios with JWT interceptors (optional)
├── context/
│   └── AuthContext.jsx    # Authentication context
└── components/
    ├── Login.jsx          # Updated login component
    ├── ProtectedRoute.jsx # Route protection
    └── UsersList.jsx      # Example API call component
```

### Step 2.3: Update App.jsx

Wrap your app with AuthProvider:

```jsx
// App.jsx
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

### Step 2.4: Update Your Components

#### Option A: Using the Auth Context

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user.user_name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

#### Option B: Making API Calls with JWT

**Using Axios (Recommended):**
```jsx
import api from '../utils/axiosConfig';

const fetchData = async () => {
  try {
    const response = await api.get('/jwt_users.php');
    console.log(response.data);
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

**Using Fetch:**
```jsx
import { getAccessToken } from '../utils/auth';

const fetchData = async () => {
  const token = getAccessToken();
  
  const response = await fetch('http://localhost/api/jwt_users.php', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  console.log(data);
};
```

### Step 2.5: Update All API Calls

Find all instances where you make API calls and update them:

**Before (Session-based):**
```jsx
const response = await fetch('http://localhost/api/users.php', {
  credentials: 'include',  // ← Remove this
});
```

**After (JWT-based):**
```jsx
import api from '../utils/axiosConfig';

const response = await api.get('/jwt_users.php');
// Token is automatically added by interceptor
```

### Step 2.6: Remove Session-Related Code

Remove these from your fetch calls:
- `credentials: 'include'`
- Any cookie-related code

---

## Phase 3: Testing

### Step 3.1: Test Login Flow

1. Clear browser localStorage: `localStorage.clear()`
2. Navigate to login page
3. Login with valid credentials
4. Verify:
   - ✅ Tokens stored in localStorage
   - ✅ User redirected to dashboard
   - ✅ User data displays correctly

### Step 3.2: Test Protected Routes

1. Try accessing protected page without login
2. Should redirect to login page
3. After login, should access page successfully

### Step 3.3: Test Token Refresh

1. Wait for token to expire (or manually set short expiration in `jwt_config.php`)
2. Make an API call
3. Verify token automatically refreshes
4. Request should succeed

### Step 3.4: Test Logout

1. Click logout button
2. Verify:
   - ✅ localStorage cleared
   - ✅ Redirected to login
   - ✅ Cannot access protected routes

### Step 3.5: Test Multiple Tabs

1. Login in Tab 1
2. Open Tab 2
3. Verify user is authenticated in Tab 2
4. Logout in Tab 1
5. Refresh Tab 2
6. Verify Tab 2 shows logged out

### Step 3.6: Test Role-Based Access

If using role-based protection:
1. Login as regular user
2. Try accessing admin route
3. Should show "Access Denied"
4. Login as admin
5. Should access admin route

---

## Phase 4: Deployment

### Step 4.1: Pre-Deployment Checklist

- [ ] All tests passing in development
- [ ] JWT secret generated and secured
- [ ] Database backup completed
- [ ] Old session files backed up
- [ ] All team members aware of migration

### Step 4.2: Deploy Backend

1. Upload new JWT files to production server
2. Set JWT_SECRET environment variable (DO NOT hardcode in production!)
3. Test login endpoint in production

### Step 4.3: Deploy Frontend

1. Build React app: `npm run build`
2. Deploy to production
3. Clear browser cache
4. Test complete user flow

### Step 4.4: Monitor for Issues

Watch for:
- 401 errors (token expiration issues)
- CORS errors (header configuration)
- Token refresh failures
- Performance issues

### Step 4.5: Clean Up (After 1 Week of Stable Operation)

Once confident everything works:

1. **Remove old session files:**
   - `session_config.php`
   - `login.php` (old version)
   - `auth.php` (old version)
   - `logout.php` (old version)

2. **Rename JWT files** (optional):
   - `jwt_login.php` → `login.php`
   - `jwt_auth.php` → `auth.php`
   - `jwt_logout.php` → `logout.php`
   - Update frontend API paths accordingly

---

## Rollback Plan

If something goes wrong:

### Immediate Rollback (Under 5 minutes)

1. **Backend:** Remove JWT files, restore old session files
2. **Frontend:** Revert to previous deployment
3. Clear users' localStorage: Ask users to clear their browser cache

### Partial Rollback

Keep JWT backend, revert frontend only:
- Users can still use old session-based app
- Investigate JWT frontend issues

---

## Key Differences Summary

### Storage Location
| Aspect | Session | JWT |
|--------|---------|-----|
| **Server** | Stores user data | No storage (stateless) |
| **Client** | Receives session ID cookie | Receives full token |

### How Client Sends Auth
| Method | Session | JWT |
|--------|---------|-----|
| **Automatic** | Cookie (automatic) | Manual header |
| **Header** | Not needed | `Authorization: Bearer <token>` |

### Expiration
| Aspect | Session | JWT |
|--------|---------|-----|
| **Control** | Server-controlled | Baked into token |
| **Revocation** | Immediate | Requires blacklist |
| **Extension** | Easy | Need refresh token |

### Security
| Feature | Session | JWT |
|---------|---------|-----|
| **Storage** | Server-side (safer) | Client-side |
| **Secret** | PHP manages | Must secure JWT_SECRET |
| **Logout** | Destroys session | Delete token (client-side) |

### API Calls

**Session (OLD):**
```jsx
fetch('http://localhost/api/users.php', {
  credentials: 'include'
});
```

**JWT (NEW):**
```jsx
fetch('http://localhost/api/jwt_users.php', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## Common Issues & Solutions

### Issue: "No authorization token provided"
**Solution:** Check if token is in localStorage and being sent in Authorization header

### Issue: "Invalid or expired token"
**Solutions:**
- Token may have expired (check expiration time)
- JWT_SECRET may be different between environments
- Token may be malformed

### Issue: CORS errors
**Solution:** Ensure backend has proper CORS headers including `Authorization`

### Issue: Token not refreshing automatically
**Solution:** Check axios interceptor is properly configured

### Issue: User logged out unexpectedly
**Solution:** 
- Check token expiration settings
- Verify refresh token logic
- Check for localStorage clearing

---

## Best Practices

1. **Always use HTTPS in production** - JWTs in HTTP are vulnerable
2. **Keep tokens short-lived** - Access tokens should expire in 15-60 minutes
3. **Use refresh tokens** - Allow long sessions without security risk
4. **Never log tokens** - Tokens are sensitive, don't console.log them
5. **Implement token blacklisting** - For critical apps, maintain revoked token list
6. **Rotate JWT secrets** - Change JWT_SECRET periodically
7. **Monitor token generation** - Watch for suspicious token creation patterns

---

## Additional Resources

- JWT Official Site: https://jwt.io
- JWT Debugger: https://jwt.io/#debugger
- PHP JWT Libraries: https://github.com/firebase/php-jwt
- OWASP JWT Security: https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html

---

## Support

If you encounter issues during migration:
1. Check this guide's "Common Issues" section
2. Review server error logs: `/var/log/apache2/error.log`
3. Check browser console for errors
4. Test each endpoint individually with Postman/curl

---

**Migration Date:** _____________
**Completed By:** _____________
**Sign Off:** _____________

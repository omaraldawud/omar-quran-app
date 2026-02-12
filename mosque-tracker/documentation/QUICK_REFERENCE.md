# JWT Migration Quick Reference

## 🎯 Quick Start Checklist

### Backend (5 minutes)
1. Upload 8 JWT PHP files to `/api/`
2. Run `php jwt_config.php` to generate secret
3. Update JWT_SECRET in `jwt_config.php`
4. Test `jwt_login.php` with curl/Postman

### Frontend (10 minutes)
1. Copy `auth.js` to `src/utils/`
2. Copy `axiosConfig.js` to `src/utils/` (if using axios)
3. Copy `AuthContext.jsx` to `src/context/`
4. Wrap App with `<AuthProvider>`
5. Update Login component
6. Update all API calls to use JWT

---

## 📝 Key Code Changes

### Session → JWT Mapping

| Feature | Session File | JWT File |
|---------|-------------|----------|
| Login | `login.php` | `jwt_login.php` |
| Auth Check | `auth.php` | `jwt_auth.php` |
| Logout | `logout.php` | `jwt_logout.php` |
| Protected API | `users.php` | `jwt_users.php` |

---

## 🔐 Authentication Flow Comparison

### Session-Based (OLD)
```
1. User logs in
2. Server stores data in $_SESSION
3. Server sends session ID cookie
4. Client sends cookie automatically
5. Server looks up session data
```

### JWT-Based (NEW)
```
1. User logs in
2. Server creates signed JWT token
3. Server sends token to client
4. Client stores token in localStorage
5. Client sends token in Authorization header
6. Server validates token signature
```

---

## 💻 Frontend Code Templates

### Login Component
```jsx
import { storeAuthData } from '../utils/auth';

const res = await fetch('http://localhost/api/jwt_login.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await res.json();
if (data.success) {
  storeAuthData(data.access_token, data.refresh_token, data.user);
  onLogin(data.user);
}
```

### Making API Calls
```jsx
// With Axios (automatic token injection)
import api from '../utils/axiosConfig';
const response = await api.get('/jwt_users.php');

// With Fetch (manual token)
import { getAccessToken } from '../utils/auth';
const token = getAccessToken();
const response = await fetch('http://localhost/api/jwt_users.php', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Logout
```jsx
import { clearAuthData } from '../utils/auth';

const handleLogout = async () => {
  await fetch('http://localhost/api/jwt_logout.php', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getAccessToken()}` }
  });
  clearAuthData();
  navigate('/login');
};
```

---

## 🛡️ Backend Code Templates

### Protect Any Endpoint
```php
require 'jwt_middleware.php';

// Simple protection
$auth = requireJWTAuth();
$userId = $auth->user_id;

// With role check
$auth = requireJWTAuth(['allowed_roles' => ['admin']]);

// With DB verification
$auth = requireJWTAuth(['require_active' => true]);
```

### Create Protected Endpoint
```php
<?php
require 'db.php';
require 'jwt_middleware.php';

// Protect this endpoint
$auth = requireJWTAuth();

// Access user info from token
$userId = $auth->user_id;
$userRole = $auth->role;

// Your endpoint logic here
$stmt = $pdo->prepare("SELECT * FROM data WHERE user_id = ?");
$stmt->execute([$userId]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
?>
```

---

## 🧪 Testing Commands

### Test Login
```bash
curl -X POST http://localhost/api/jwt_login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Test Auth Check
```bash
TOKEN="eyJ0eXAi..." # Your token here
curl -X GET http://localhost/api/jwt_auth.php \
  -H "Authorization: Bearer $TOKEN"
```

### Test Protected Endpoint
```bash
curl -X GET http://localhost/api/jwt_users.php \
  -H "Authorization: Bearer $TOKEN"
```

### Test Refresh Token
```bash
REFRESH="eyJ0eXAi..." # Your refresh token
curl -X POST http://localhost/api/jwt_refresh.php \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\":\"$REFRESH\"}"
```

---

## 🚨 Troubleshooting

| Error | Solution |
|-------|----------|
| "No token provided" | Check Authorization header format: `Bearer <token>` |
| "Invalid token" | Verify JWT_SECRET matches across files |
| "Token expired" | Use refresh token to get new access token |
| CORS error | Add `Authorization` to allowed headers |
| 401 on API call | Token expired or invalid, trigger refresh |

---

## 📊 Token Lifetimes

| Token Type | Default Lifetime | Purpose |
|------------|-----------------|---------|
| Access Token | 1 hour | API authentication |
| Refresh Token | 7 days | Get new access token |

Adjust in `jwt_config.php`:
```php
define('JWT_ACCESS_TOKEN_LIFETIME', 3600);      // 1 hour
define('JWT_REFRESH_TOKEN_LIFETIME', 604800);   // 7 days
```

---

## 🔑 localStorage Keys

```javascript
// These keys are used by auth.js
'access_token'   // JWT access token
'refresh_token'  // JWT refresh token  
'user_data'      // User object as JSON
```

Clear all:
```javascript
import { clearAuthData } from '../utils/auth';
clearAuthData();
```

---

## ⚡ Common Patterns

### Check if Logged In
```jsx
import { isAuthenticated } from '../utils/auth';

if (isAuthenticated()) {
  // User is logged in
}
```

### Get Current User
```jsx
import { getStoredUser } from '../utils/auth';

const user = getStoredUser();
console.log(user.user_name);
```

### Decode Token
```jsx
import { parseJwt } from '../utils/auth';

const token = getAccessToken();
const payload = parseJwt(token);
console.log(payload.exp); // Expiration timestamp
```

---

## 🎨 React Hook Usage

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;
  
  return (
    <div>
      <h1>Hello {user.user_name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 📦 File Structure

```
Backend (/api/)
├── jwt_config.php          # Configuration
├── jwt_helper.php          # Core JWT functions
├── jwt_middleware.php      # Reusable protection
├── jwt_login.php           # Login endpoint
├── jwt_auth.php            # Auth check endpoint
├── jwt_refresh.php         # Refresh token endpoint
├── jwt_logout.php          # Logout endpoint
└── jwt_users.php           # Example protected endpoint

Frontend (src/)
├── utils/
│   ├── auth.js             # Token management
│   └── axiosConfig.js      # Axios setup (optional)
├── context/
│   └── AuthContext.jsx     # Auth state management
└── components/
    ├── Login.jsx           # Login form
    ├── ProtectedRoute.jsx  # Route guard
    └── UsersList.jsx       # Example API usage
```

---

## 🔒 Security Reminders

1. ✅ Use HTTPS in production
2. ✅ Keep JWT_SECRET secure
3. ✅ Don't log tokens
4. ✅ Short access token lifetime
5. ✅ Use refresh tokens
6. ✅ Validate on every request
7. ✅ Check user is_active in DB

---

## 🎓 Key Concepts

**Stateless:** Server doesn't store session data
**Self-contained:** Token contains all user info
**Signed:** Can't be tampered with
**Expiring:** Automatic expiration built-in
**Portable:** Works across domains/services

---

## 💡 When to Refresh Token

Automatic refresh happens when:
- Access token expires
- API returns 401
- Before expiration (5 min)

Manual refresh:
```jsx
import api from '../utils/axiosConfig';
// Interceptor handles refresh automatically
const data = await api.get('/endpoint');
```

---

**Print this page for quick reference during migration!**

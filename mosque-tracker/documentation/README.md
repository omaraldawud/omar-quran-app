# JWT Authentication Migration Package

Complete migration package to convert your PHP session-based authentication system to JWT (JSON Web Tokens).

## 📦 Package Contents

```
jwt-migration/
├── backend/               # PHP JWT implementation
│   ├── jwt_config.php          # JWT configuration & secret
│   ├── jwt_helper.php          # JWT encoding/decoding utilities
│   ├── jwt_middleware.php      # Reusable endpoint protection
│   ├── jwt_login.php           # Login endpoint
│   ├── jwt_auth.php            # Authentication check endpoint
│   ├── jwt_refresh.php         # Token refresh endpoint
│   ├── jwt_logout.php          # Logout endpoint
│   └── jwt_users.php           # Example protected endpoint
│
├── frontend/              # React/JavaScript utilities
│   ├── auth.js                 # Token management utilities
│   ├── axiosConfig.js          # Axios with JWT interceptors
│   ├── Login.jsx               # Updated login component
│   ├── AuthContext.jsx         # Authentication context provider
│   ├── ProtectedRoute.jsx      # Route protection component
│   └── UsersList.jsx           # Example API call component
│
└── docs/                  # Documentation
    ├── MIGRATION_GUIDE.md      # Step-by-step migration guide
    ├── QUICK_REFERENCE.md      # Quick reference cheat sheet
    └── VISUAL_COMPARISON.md    # Visual flow diagrams
```

---

## 🎯 What This Package Does

This package provides everything you need to migrate from:

**Session-Based Authentication:**
- Server stores user data in `$_SESSION`
- Client sends session ID cookie
- Server looks up session data on each request

**To JWT Authentication:**
- Server creates signed tokens
- Client stores tokens in localStorage
- Server validates token signature (no lookup needed)

---

## ✨ Key Features

### Backend (PHP)
- ✅ Pure PHP implementation (no external libraries required)
- ✅ Secure token generation with HMAC-SHA256
- ✅ Access tokens (short-lived) + Refresh tokens (long-lived)
- ✅ Reusable middleware for endpoint protection
- ✅ Role-based access control support
- ✅ Automatic token expiration handling

### Frontend (React)
- ✅ Token storage management (localStorage)
- ✅ Automatic token refresh on expiration
- ✅ Axios interceptors for seamless API calls
- ✅ Auth context for global state management
- ✅ Protected route components
- ✅ Works with React Router

---

## 🚀 Quick Start

### 1. Generate JWT Secret (1 minute)
```bash
php backend/jwt_config.php
```
Copy the generated secret.

### 2. Configure Backend (2 minutes)
Edit `backend/jwt_config.php`:
```php
define('JWT_SECRET', 'YOUR_GENERATED_SECRET_HERE');
```

### 3. Upload Backend Files (1 minute)
Upload all files from `backend/` to your `/api/` directory.

### 4. Test Backend (2 minutes)
```bash
curl -X POST http://localhost/api/jwt_login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### 5. Copy Frontend Files (3 minutes)
Copy files from `frontend/` to your React project:
- `auth.js` → `src/utils/`
- `axiosConfig.js` → `src/utils/`
- `AuthContext.jsx` → `src/context/`
- Other components to appropriate locations

### 6. Wrap Your App (1 minute)
```jsx
// App.jsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

### 7. Update Login Component (2 minutes)
Replace your login component with the provided `Login.jsx` or update your existing one.

### 8. Test Frontend (2 minutes)
Login and verify tokens are stored in localStorage.

**Total Time: ~15 minutes** ⚡

---

## 📚 Documentation

### For Step-by-Step Migration
**Read:** `docs/MIGRATION_GUIDE.md`
- Complete migration process
- Testing procedures
- Rollback plans
- Common issues & solutions

### For Quick Reference
**Read:** `docs/QUICK_REFERENCE.md`
- Code templates
- Testing commands
- Common patterns
- Troubleshooting table

### For Understanding the Concepts
**Read:** `docs/VISUAL_COMPARISON.md`
- Visual flow diagrams
- Architecture comparison
- Security considerations
- Performance analysis

---

## 🔄 Migration Flow Overview

```
Current State (Session)          →          Future State (JWT)
─────────────────────────                  ─────────────────────────
login.php                        →         jwt_login.php
auth.php                         →         jwt_auth.php
logout.php                       →         jwt_logout.php
users.php                        →         jwt_users.php
session_config.php               →         jwt_config.php

$_SESSION['user']               →         localStorage tokens
Cookie: PHPSESSID               →         Authorization: Bearer <token>
```

---

## 🎓 Key Concepts Explained

### What is a JWT?
A JWT (JSON Web Token) is a signed string containing user information:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0Mn0.signature
└────────────┬────────────┘ └──────┬──────┘ └────┬────┘
          HEADER             PAYLOAD         SIGNATURE
```

### Access Token vs Refresh Token
- **Access Token:** Short-lived (1 hour), used for API calls
- **Refresh Token:** Long-lived (7 days), used to get new access token

### Why JWT Over Sessions?

**Advantages:**
- ✅ Stateless (no server storage)
- ✅ Scalable (works across multiple servers)
- ✅ Portable (works with mobile apps, microservices)
- ✅ Faster (no database lookup per request)

**Trade-offs:**
- ⚠️ Cannot revoke tokens easily (need blacklist)
- ⚠️ Larger payload size
- ⚠️ Token theft concerns (use HTTPS!)

---

## 🔐 Security Best Practices

1. **Always use HTTPS in production**
   - JWTs transmitted over HTTP can be intercepted
   
2. **Keep JWT_SECRET secure**
   - Use environment variables
   - Never commit to version control
   - Rotate periodically

3. **Short token lifetimes**
   - Access tokens: 15-60 minutes
   - Refresh tokens: 7-30 days

4. **Implement refresh tokens**
   - Don't make access tokens long-lived
   - Use refresh tokens for long sessions

5. **Consider token blacklisting**
   - For critical applications
   - Store revoked tokens until expiration

6. **Validate on every request**
   - Check signature
   - Check expiration
   - Check user is still active

---

## 🧪 Testing Your Implementation

### Test Checklist
- [ ] Login succeeds with valid credentials
- [ ] Login fails with invalid credentials
- [ ] Tokens stored in localStorage after login
- [ ] Protected routes require authentication
- [ ] API calls include Authorization header
- [ ] Token refresh works on expiration
- [ ] Logout clears all tokens
- [ ] Cannot access protected routes after logout
- [ ] Multiple tabs stay in sync
- [ ] Role-based access works (if implemented)

### Testing Commands
See `docs/QUICK_REFERENCE.md` for curl commands to test each endpoint.

---

## 🔧 Customization

### Adjust Token Lifetimes
Edit `backend/jwt_config.php`:
```php
define('JWT_ACCESS_TOKEN_LIFETIME', 900);    // 15 minutes
define('JWT_REFRESH_TOKEN_LIFETIME', 86400); // 1 day
```

### Add Custom Claims to Token
Edit `backend/jwt_login.php`:
```php
$tokenPayload = [
    'user_id'              => $user['id'],
    'user_name'            => $user['user_name'],
    'custom_field'         => $user['custom_field'], // Add this
    // ... rest
];
```

### Protect Endpoint with Roles
```php
require 'jwt_middleware.php';

// Only admins can access
$auth = requireJWTAuth(['allowed_roles' => ['admin', 'super_admin']]);
```

### Add Token to Blacklist
Create a `blacklisted_tokens` table:
```sql
CREATE TABLE blacklisted_tokens (
    token VARCHAR(500) PRIMARY KEY,
    expires_at DATETIME,
    blacklisted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (expires_at)
);
```

Check blacklist in `jwt_helper.php`:
```php
public static function validateToken($token) {
    // ... existing validation ...
    
    // Check blacklist
    $stmt = $pdo->prepare("SELECT 1 FROM blacklisted_tokens WHERE token = ?");
    $stmt->execute([$token]);
    if ($stmt->fetch()) {
        return false; // Token is blacklisted
    }
    
    return $payload;
}
```

---

## 🆘 Common Issues

### "No authorization token provided"
**Cause:** Token not being sent in Authorization header  
**Solution:** Check that axios interceptor is configured or manually add header

### "Invalid or expired token"
**Cause:** Token expired or JWT_SECRET mismatch  
**Solution:** 
1. Check token expiration time
2. Verify JWT_SECRET is same across all files
3. Trigger token refresh

### CORS errors
**Cause:** Missing Authorization in allowed headers  
**Solution:** Add to backend:
```php
header("Access-Control-Allow-Headers: Content-Type, Authorization");
```

### Token refresh not working
**Cause:** Axios interceptor not properly configured  
**Solution:** Ensure `axiosConfig.js` is imported and used for all API calls

### User logged out unexpectedly
**Causes:**
1. Token expired and refresh failed
2. localStorage was cleared
3. User inactive in database

**Solutions:**
1. Check token lifetimes
2. Verify refresh token logic
3. Check user.is_active in database

---

## 📊 Performance Comparison

| Metric | Session | JWT |
|--------|---------|-----|
| Auth check speed | 10-50ms | 1-5ms |
| Server storage | Required | None |
| Horizontal scaling | Complex | Easy |
| Database queries | 1-2 per request | Optional |
| Network payload | ~50 bytes | ~200-500 bytes |

---

## 🎨 Example Use Cases

### Making an Authenticated API Call
```javascript
// Using axios (recommended)
import api from './utils/axiosConfig';
const users = await api.get('/jwt_users.php');

// Using fetch
import { getAccessToken } from './utils/auth';
const response = await fetch('/api/jwt_users.php', {
  headers: { 'Authorization': `Bearer ${getAccessToken()}` }
});
```

### Checking Authentication Status
```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome {user.user_name}!</div>;
}
```

### Protecting a Route
```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

---

## 📞 Support & Resources

### Included Documentation
- **MIGRATION_GUIDE.md** - Complete step-by-step guide
- **QUICK_REFERENCE.md** - Handy code snippets and commands
- **VISUAL_COMPARISON.md** - Flow diagrams and architecture

### External Resources
- [JWT.io](https://jwt.io) - JWT debugger and documentation
- [OWASP JWT Security](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

### Code Comments
All provided files include extensive inline comments explaining each step.

---

## 🗺️ Migration Roadmap

### Phase 1: Setup (Day 1)
- [ ] Generate JWT secret
- [ ] Upload backend files
- [ ] Test backend endpoints
- [ ] Copy frontend utilities

### Phase 2: Development (Day 2-3)
- [ ] Update login component
- [ ] Wrap app with AuthProvider
- [ ] Update API calls
- [ ] Add protected routes
- [ ] Test in development

### Phase 3: Staging (Day 4)
- [ ] Deploy to staging environment
- [ ] Full end-to-end testing
- [ ] Performance testing
- [ ] Security review

### Phase 4: Production (Day 5)
- [ ] Deploy to production
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Optimize as needed

### Phase 5: Cleanup (Day 12)
- [ ] Remove old session files
- [ ] Archive backups
- [ ] Update documentation
- [ ] Team training

---

## ⚖️ License

This migration package is provided as-is for your use. Modify as needed for your specific requirements.

---

## 🙏 Acknowledgments

This package includes:
- Pure PHP JWT implementation (no external dependencies)
- React hooks for authentication
- Axios interceptors for automatic token refresh
- Comprehensive documentation and examples

---

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- Complete PHP JWT implementation
- React authentication utilities
- Comprehensive migration guide
- Visual comparison documentation
- Testing tools and examples

---

**Ready to migrate? Start with `docs/MIGRATION_GUIDE.md`!**

For questions or issues during migration, refer to the troubleshooting sections in the documentation.

Good luck! 🚀

# Session vs JWT: Visual Flow Comparison

## 🔄 Login Flow

### Session-Based (OLD)
```
┌─────────┐                           ┌─────────┐
│ Browser │                           │  Server │
└────┬────┘                           └────┬────┘
     │                                     │
     │  POST /login.php                    │
     │  {email, password}                  │
     ├────────────────────────────────────>│
     │                                     │
     │                                     │ 1. Validate credentials
     │                                     │ 2. Store in $_SESSION
     │                                     │ 3. Generate session ID
     │                                     │
     │  200 OK                             │
     │  Set-Cookie: PHPSESSID=abc123       │
     │  {success: true, user: {...}}       │
     │<────────────────────────────────────┤
     │                                     │
     │ Browser automatically stores cookie │
     │ and sends it with every request     │
     │                                     │
```

### JWT-Based (NEW)
```
┌─────────┐                           ┌─────────┐
│ Browser │                           │  Server │
└────┬────┘                           └────┬────┘
     │                                     │
     │  POST /jwt_login.php                │
     │  {email, password}                  │
     ├────────────────────────────────────>│
     │                                     │
     │                                     │ 1. Validate credentials
     │                                     │ 2. Create JWT token
     │                                     │ 3. Sign with secret
     │                                     │
     │  200 OK                             │
     │  {                                  │
     │    success: true,                   │
     │    user: {...},                     │
     │    access_token: "eyJ...",          │
     │    refresh_token: "eyJ..."          │
     │  }                                  │
     │<────────────────────────────────────┤
     │                                     │
     │ JavaScript stores tokens in         │
     │ localStorage manually               │
     │                                     │
```

---

## 🔐 Protected API Request Flow

### Session-Based (OLD)
```
┌─────────┐                           ┌─────────┐
│ Browser │                           │  Server │
└────┬────┘                           └────┬────┘
     │                                     │
     │  GET /users.php                     │
     │  Cookie: PHPSESSID=abc123           │
     ├────────────────────────────────────>│
     │  (Cookie sent automatically)        │
     │                                     │
     │                                     │ 1. Receive session ID
     │                                     │ 2. Look up session file
     │                                     │ 3. Read $_SESSION data
     │                                     │ 4. Verify user_id exists
     │                                     │
     │  200 OK                             │
     │  [users array]                      │
     │<────────────────────────────────────┤
     │                                     │
```

### JWT-Based (NEW)
```
┌─────────┐                           ┌─────────┐
│ Browser │                           │  Server │
└────┬────┘                           └────┬────┘
     │                                     │
     │  GET /jwt_users.php                 │
     │  Authorization: Bearer eyJ0eX...    │
     ├────────────────────────────────────>│
     │  (Token sent manually in header)    │
     │                                     │
     │                                     │ 1. Extract token
     │                                     │ 2. Verify signature
     │                                     │ 3. Decode payload
     │                                     │ 4. Check expiration
     │                                     │ 5. Extract user_id
     │                                     │ (No DB/file lookup!)
     │                                     │
     │  200 OK                             │
     │  [users array]                      │
     │<────────────────────────────────────┤
     │                                     │
```

---

## 🔄 Token Refresh Flow (JWT Only)

```
┌─────────┐                           ┌─────────┐
│ Browser │                           │  Server │
└────┬────┘                           └────┬────┘
     │                                     │
     │  GET /jwt_users.php                 │
     │  Authorization: Bearer <expired>    │
     ├────────────────────────────────────>│
     │                                     │
     │                                     │ Token expired!
     │  401 Unauthorized                   │
     │<────────────────────────────────────┤
     │                                     │
     │                                     │
     │ Axios interceptor catches 401       │
     │ Automatically sends refresh request │
     │                                     │
     │  POST /jwt_refresh.php              │
     │  {refresh_token: "eyJ..."}          │
     ├────────────────────────────────────>│
     │                                     │
     │                                     │ 1. Validate refresh token
     │                                     │ 2. Generate new access token
     │                                     │
     │  200 OK                             │
     │  {                                  │
     │    success: true,                   │
     │    access_token: "eyJ...",          │
     │    expires_in: 3600                 │
     │  }                                  │
     │<────────────────────────────────────┤
     │                                     │
     │ Update localStorage                 │
     │ Retry original request              │
     │                                     │
     │  GET /jwt_users.php                 │
     │  Authorization: Bearer <new_token>  │
     ├────────────────────────────────────>│
     │                                     │
     │  200 OK                             │
     │  [users array]                      │
     │<────────────────────────────────────┤
     │                                     │
```

---

## 🚪 Logout Flow

### Session-Based (OLD)
```
┌─────────┐                           ┌─────────┐
│ Browser │                           │  Server │
└────┬────┘                           └────┬────┘
     │                                     │
     │  POST /logout.php                   │
     │  Cookie: PHPSESSID=abc123           │
     ├────────────────────────────────────>│
     │                                     │
     │                                     │ 1. Find session file
     │                                     │ 2. Delete session data
     │                                     │ 3. Remove session file
     │                                     │ 4. Clear cookie
     │                                     │
     │  200 OK                             │
     │  Set-Cookie: PHPSESSID=; expires... │
     │<────────────────────────────────────┤
     │                                     │
     │ Session completely destroyed        │
     │ Cannot be used anymore              │
     │                                     │
```

### JWT-Based (NEW)
```
┌─────────┐                           ┌─────────┐
│ Browser │                           │  Server │
└────┬────┘                           └────┬────┘
     │                                     │
     │  POST /jwt_logout.php               │
     │  Authorization: Bearer eyJ0eX...    │
     ├────────────────────────────────────>│
     │                                     │
     │                                     │ 1. Log event (optional)
     │                                     │ 2. Add to blacklist (optional)
     │                                     │
     │  200 OK                             │
     │  {success: true}                    │
     │<────────────────────────────────────┤
     │                                     │
     │ Delete tokens from localStorage     │
     │                                     │
     │ Note: Token still technically valid │
     │ until expiration (unless blacklisted)│
     │                                     │
```

---

## 📊 Data Storage Comparison

### Session-Based
```
SERVER SIDE:
┌─────────────────────────────────┐
│ /var/lib/php/sessions/          │
│                                 │
│ sess_abc123                     │
│ ┌─────────────────────────────┐ │
│ │ user|a:5:{                  │ │
│ │   s:2:"id";i:42;            │ │
│ │   s:9:"user_name";          │ │
│ │   s:10:"John Doe";          │ │
│ │   s:4:"role";               │ │
│ │   s:5:"admin";              │ │
│ │   ...                       │ │
│ │ }                           │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘

CLIENT SIDE:
┌─────────────────────────────────┐
│ Browser Cookie                  │
│                                 │
│ PHPSESSID=abc123                │
│                                 │
│ (Just the session ID,           │
│  no actual user data)           │
└─────────────────────────────────┘
```

### JWT-Based
```
SERVER SIDE:
┌─────────────────────────────────┐
│ No storage!                     │
│ (Stateless)                     │
│                                 │
│ Only needs JWT_SECRET to        │
│ verify signatures               │
└─────────────────────────────────┘

CLIENT SIDE:
┌─────────────────────────────────┐
│ localStorage                    │
│                                 │
│ access_token:                   │
│ "eyJ0eXAiOiJKV1QiLCJh..."       │
│                                 │
│ refresh_token:                  │
│ "eyJ0eXAiOiJKV1QiLCJh..."       │
│                                 │
│ user_data:                      │
│ {                               │
│   "id": 42,                     │
│   "user_name": "John Doe",      │
│   "role": "admin",              │
│   ...                           │
│ }                               │
│                                 │
│ (Complete user data + tokens)   │
└─────────────────────────────────┘
```

---

## 🔍 Token Structure

### JWT Token Anatomy
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MiwidXNlcl9uYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk1MDAwMDAsImV4cCI6MTcwOTUwMzYwMH0.signature_here
├──────────────────┬─────────────────┤├────────────────────────────────┬────────────────────────────────┤├───────┬───────┤
        HEADER                                      PAYLOAD                                           SIGNATURE

HEADER (Base64):
{
  "typ": "JWT",
  "alg": "HS256"
}

PAYLOAD (Base64):
{
  "user_id": 42,
  "user_name": "John Doe",
  "role": "admin",
  "iat": 1709500000,    // Issued at
  "exp": 1709503600,    // Expires
  "iss": "masjid_saas"  // Issuer
}

SIGNATURE:
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```

---

## ⏱️ Expiration Handling

### Session (Server Controls)
```
Time  │ Session Status
──────┼─────────────────────────────
0:00  │ ✅ User logs in
      │ Session created
      │
1:00  │ ✅ Session active
      │ User makes request
      │ Session extended (if configured)
      │
2:00  │ ⚠️ Approaching timeout
      │ Server can extend automatically
      │
2:30  │ ❌ Session expires
      │ Server deletes session file
      │ User must re-login
      │
      │ OR admin can manually destroy
      │ session at any time
```

### JWT (Client Must Handle)
```
Time  │ Token Status
──────┼─────────────────────────────
0:00  │ ✅ User logs in
      │ Token created (exp: 1:00)
      │ Refresh token (exp: 168:00)
      │
0:30  │ ✅ Token valid
      │ User makes requests normally
      │
0:55  │ ⚠️ Token expiring soon
      │ Axios interceptor refreshes
      │ New token created
      │
1:00  │ ❌ Original token expired
      │ But new token already issued
      │ User never notices
      │
168:00│ ❌ Refresh token expires
      │ User must re-login
      │
      │ NOTE: Server cannot revoke
      │ tokens without blacklist
```

---

## 🏗️ Architecture Differences

### Session-Based Architecture
```
                    ┌──────────────┐
                    │   Database   │
                    │              │
                    │  users table │
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼─────┐    ┌──────▼──────┐    ┌────▼─────┐
    │ Server 1 │    │  Server 2   │    │ Server 3 │
    │          │    │             │    │          │
    │ Session  │    │  Session    │    │ Session  │
    │ Storage  │    │  Storage    │    │ Storage  │
    └────┬─────┘    └──────┬──────┘    └────┬─────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Clients   │
                    │             │
                    │  Send cookie│
                    └─────────────┘

Problem: Sessions not shared between servers
Solution: Use Redis or shared session storage
```

### JWT Architecture
```
                    ┌──────────────┐
                    │   Database   │
                    │              │
                    │  users table │
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼─────┐    ┌──────▼──────┐    ┌────▼─────┐
    │ Server 1 │    │  Server 2   │    │ Server 3 │
    │          │    │             │    │          │
    │ JWT      │    │  JWT        │    │ JWT      │
    │ Verify   │    │  Verify     │    │ Verify   │
    └────┬─────┘    └──────┬──────┘    └────┬─────┘
         │                 │                 │
         │     All share same JWT_SECRET     │
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Clients   │
                    │             │
                    │  Send token │
                    └─────────────┘

Benefit: Any server can verify token
No shared storage needed!
```

---

## 📈 Performance Comparison

### Session: Database Lookup Required
```
Request arrives
    ↓
Extract session ID from cookie
    ↓
Look up session file/Redis (I/O operation)
    ↓
Deserialize session data
    ↓
Get user ID
    ↓
Query database for user (another I/O)
    ↓
Process request

Total: ~10-50ms overhead
```

### JWT: No Lookup Needed
```
Request arrives
    ↓
Extract token from header
    ↓
Verify signature (CPU operation)
    ↓
Decode payload (CPU operation)
    ↓
Get user ID from token
    ↓
Process request

Total: ~1-5ms overhead
Optional: Query DB only if needed
```

---

## 🎯 Use Cases

### Session is Better For:
- Traditional web apps (SSR)
- When you need instant logout
- Internal admin systems
- Single-server deployments
- When client-side security is a concern

### JWT is Better For:
- REST APIs
- Microservices
- Mobile apps
- Third-party integrations
- Distributed systems
- When scalability is critical
- Stateless architecture preferred

---

## 🔐 Security Considerations

### Session Vulnerabilities
```
❌ Session Fixation
❌ Session Hijacking (steal cookie)
✅ Easy to revoke
✅ Server-side control
✅ More secure storage
```

### JWT Vulnerabilities
```
❌ Token Theft (XSS attacks)
❌ Cannot revoke easily
❌ Larger payload size
✅ No CSRF attacks
✅ Works cross-domain
✅ Cryptographically signed
```

---

**Summary:** Both have tradeoffs. JWT offers better scalability and flexibility, while sessions offer simpler revocation and stronger server control.

-- Sample users for testing the login system
-- Password for all users: "password123"
-- Password hash generated with: password_hash("password123", PASSWORD_DEFAULT)

INSERT INTO users (
  organization_id, 
  role, 
  user_name, 
  user_email, 
  password_hash,
  user_phone,
  is_active,
  email_verified
) VALUES 
-- System Admin
(
  1,
  'system_admin',
  'Admin User',
  'admin@example.com',
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '555-0001',
  1,
  1
),

-- Organization Admin
(
  2,
  'organization_admin',
  'Org Admin',
  'orgadmin@example.com',
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '555-0002',
  1,
  1
),

-- Mosque Admin (associated with mosque ID 1)
(
  2,
  'mosque_admin',
  'Mosque Admin',
  'mosqueadmin@example.com',
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '555-0003',
  1,
  1
),

-- Volunteer
(
  2,
  'volunteer',
  'John Volunteer',
  'volunteer@example.com',
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '555-0004',
  1,
  1
);

-- Update the mosque admin to be associated with a specific mosque
-- UPDATE users SET associated_mosque_id = 1 WHERE user_email = 'mosqueadmin@example.com';

-- Test credentials:
-- Email: admin@example.com | Password: password123 (System Admin)
-- Email: orgadmin@example.com | Password: password123 (Org Admin)
-- Email: mosqueadmin@example.com | Password: password123 (Mosque Admin)
-- Email: volunteer@example.com | Password: password123 (Volunteer)

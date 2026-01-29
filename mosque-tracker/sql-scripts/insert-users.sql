INSERT INTO users (id, organization_id, role, user_name, user_email, user_phone, associated_mosque_id) VALUES
-- System admin
(1, 1, 'system_admin', 'System Admin', 'sysadmin@example.com', '(303) 555-0000', NULL),

-- Organization admins
(2, 1, 'organization_admin', 'Colorado Admin', 'coadmin@example.com', '(303) 555-0101', NULL),
(3, 2, 'organization_admin', 'Texas Admin', 'txadmin@example.com', '(713) 555-0202', NULL),

-- Mosque admins
(4, 1, 'mosque_admin', 'Omar Alheji', 'omar@coloradomuslimsociety.org', '(303) 555-1111', NULL),
(5, 1, 'mosque_admin', 'Abdul Rahman', 'abdul@coislamiccenter.com', '(720) 555-2222', NULL),
(6, 1, 'mosque_admin', 'Mustafa Khan', 'mustafa@ourcmcc.org', '(720) 555-3333', NULL),
(7, 2, 'mosque_admin', 'Houston Mosque Admin', 'admin@icgh.org', '(713) 555-1010', NULL);




select * from users;
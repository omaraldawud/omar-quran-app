mosques-- ================================
-- DATABASE
-- ================================
CREATE DATABASE IF NOT EXISTS masjid_saas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE masjid_saas;

-- ================================
-- ORGANIZATIONS
-- ================================
CREATE TABLE IF NOT EXISTS organizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('nonprofit','mosque','other') NOT NULL DEFAULT 'nonprofit',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ================================
-- USERS
-- ================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization_id INT NOT NULL,
  role ENUM('system_admin','organization_admin','mosque_admin') NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  associated_mosque_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (organization_id)
    REFERENCES organizations(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ================================
-- MOSQUES
-- ================================
CREATE TABLE IF NOT EXISTS mosques (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization_id INT NULL,
  name VARCHAR(255) NOT NULL,
  street VARCHAR(255),
  city VARCHAR(100),
  state CHAR(2),
  zip VARCHAR(10),
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(255),
  facebook VARCHAR(255),
  whatsapp VARCHAR(255),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (organization_id)
    REFERENCES organizations(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- ================================
-- OUTREACH LOGS
-- ================================
CREATE TABLE IF NOT EXISTS outreach_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mosque_id INT    NOT NULL,
  user_id INT      NOT NULL,
  method ENUM('phone','email','visit','whatsapp','social') NOT NULL,
  notes TEXT,
  result TEXT,
  contacted_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (mosque_id)
    REFERENCES mosques(id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ================================
-- SPEAKERS
-- ================================
CREATE TABLE IF NOT EXISTS speakers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (organization_id)
    REFERENCES organizations(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ================================
-- SCHEDULES
-- ================================
CREATE TABLE IF NOT EXISTS schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  speaker_id INT NOT NULL,
  mosque_id INT NOT NULL,
  scheduled_at DATETIME NOT NULL,
  notes TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (speaker_id)
    REFERENCES speakers(id)
    ON DELETE CASCADE,

  FOREIGN KEY (mosque_id)
    REFERENCES mosques(id)
    ON DELETE CASCADE,

  UNIQUE KEY uniq_speaker (speaker_id)
) ENGINE=InnoDB;



-- ================================
-- SEED: ORGANIZATIONS
-- ================================
INSERT INTO organizations (id, name, type) VALUES
(1, 'Colorado Outreach Org', 'nonprofit'),
(2, 'Texas Dawah Org', 'nonprofit');





-- ================================
-- SEED: MOSQUES (CO + TX)
-- ================================
INSERT INTO mosques
(id, organization_id, name, street, city, state, zip, phone, email, website, contact_name, contact_email, contact_phone)
VALUES
-- Colorado
(1, 1, 'Masjid Abu Bakr', '2071 S Parker Rd', 'Denver', 'CO', '80231',
 '(303) 696-9800', 'info@coloradomuslimsociety.org', 'https://coloradomuslimsociety.org',
 'Omar Alheji', 'omar@coloradomuslimsociety.org', '(303) 555-1111'),

(2, 1, 'Colorado Islamic Center (Masjid Al-Salam)', '14201 E Evans Ave', 'Aurora', 'CO', '80014',
 '(720) 544-3249', 'office@coislamiccenter.com', 'https://coislamiccenter.com',
 'Abdul Rahman', 'office@coislamiccenter.com', '(720) 555-2222'),

(3, 1, 'Colorado Muslims Community Center (CMCC)', '1523 S Buckley Rd', 'Aurora', 'CO', '80017',
 '(720) 432-9027', 'info@ourcmcc.org', 'https://ourcmcc.org',
 'Mustafa Khan', 'info@ourcmcc.org', '(720) 555-3333'),

(4, 1, 'Downtown Denver Islamic Center (Masjid Al-Shuhada)', '1235 Galapago St', 'Denver', 'CO', '80204',
 '(720) 580-2605', 'info@theddic.org', 'https://theddic.org',
 'Imam Karim', 'info@theddic.org', '(720) 555-4444'),

(5, 1, 'Islamic Society of Colorado Springs (Masjid Al-Farooq)', '1350 Potter Dr', 'Colorado Springs', 'CO', '80909',
 '(719) 632-3364', 'iscs.info.contact@gmail.com', 'http://iscs.info',
 'Dr. Hassan', 'iscs.info.contact@gmail.com', '(719) 555-5555'),

-- Texas
(10, 2, 'Islamic Center of Greater Houston (ICGH)', '3110 Eastside St', 'Houston', 'TX', '77098',
 '(713) 528-7130', 'info@icgh.org', 'https://icgh.org',
 'Dr. Waleed Basyouni', 'info@icgh.org', '(713) 555-1010'),

(11, 2, 'East Plano Islamic Center (EPIC)', '4700 14th St', 'Plano', 'TX', '75074',
 '(972) 423-7499', 'info@epicmasjid.org', 'https://epicmasjid.org',
 'Abdul Malik Mujahid', 'info@epicmasjid.org', '(972) 555-2020'),

(12, 2, 'Valley Ranch Islamic Center (VRIC)', '3625 Prosperity Ave', 'Irving', 'TX', '75063',
 '(972) 258-0786', 'info@valleyranchmasjid.org', 'https://valleyranchmasjid.org',
 'Imam Omar Suleiman', 'info@valleyranchmasjid.org', '(972) 555-3030'),

(13, 2, 'Islamic Association of North Texas (IANT)', '840 Abrams Rd', 'Richardson', 'TX', '75081',
 '(972) 231-5698', 'info@iant.com', 'https://iant.com',
 'Board Office', 'info@iant.com', '(972) 555-4040'),

(14, 2, 'Islamic Center of Irving', '2555 Esters Rd', 'Irving', 'TX', '75062',
 '(972) 243-0660', 'info@irvingmasjid.org', 'https://irvingmasjid.org',
 'Community Office', 'info@irvingmasjid.org', '(972) 555-5050');



-- ================================
-- SEED: OUTREACH LOGS
-- ================================
INSERT INTO outreach_logs
(mosque_id, user_id, method, notes, result, contacted_at)
VALUES
-- Colorado examples
(1, 2, 'phone', 'Spoke with admin regarding outreach program', 'Invited for Dec 3rd Jummah presentation', '2026-01-20 14:30:00'),
(1, 5, 'email', 'Sent introductory email', 'Awaiting response', '2026-01-18 10:00:00'),
(2, 2, 'visit', 'Met board member after Maghrib prayer', 'Requested follow-up meeting', '2026-01-15 18:45:00'),

-- Texas examples
(10, 3, 'email', 'Sent outreach overview deck', 'Admin requested follow-up call', '2026-01-22 09:30:00'),
(10, 3, 'phone', 'Spoke with front office', 'Referred to community coordinator', '2026-01-24 13:15:00'),
(11, 3, 'visit', 'Attended Jummah and met coordinator', 'Invited to community event', '2026-01-19 14:00:00');



-- ================================
-- SEED: SPEAKERS
-- ================================
INSERT INTO speakers (organization_id, name, bio)
VALUES
(1, 'Imam Ahmed Alawi', 'Experienced community speaker on family & faith'),
(1, 'Sister Mariam Yusuf', 'Youth engagement and outreach specialist'),
(2, 'Dr. Khalid Alvi', 'Interfaith dialogue, keynote speaker');



-- ================================
-- SEED: SCHEDULES
-- ================================
INSERT INTO schedules (speaker_id, mosque_id, scheduled_at, notes)
VALUES
-- Colorado\
(1, 1, '2026-02-15 10:00:00', 'Family & Faith Forum'),
(2, 2, '2026-02-20 13:00:00', 'Youth Outreach Workshop'),

-- Texas
(3, 10, '2026-03-05 11:00:00', 'Interfaith Conference at ICGH');

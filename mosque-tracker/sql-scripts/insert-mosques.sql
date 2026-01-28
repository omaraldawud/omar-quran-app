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


 
 select * from mosques;
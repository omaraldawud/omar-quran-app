-- Sample Organization Data
-- This demonstrates how to populate all the new organization fields

-- First, run the ALTER TABLE migration from organizations_enhanced_migration.sql
-- Then insert sample data:

INSERT INTO organizations (
    name,
    type,
    phone,
    email,
    website,
    street,
    city,
    state,
    zip,
    logo_url,
    tagline,
    mission_statement,
    description,
    talking_points,
    elevator_pitch,
    outreach_goals,
    brochure_url,
    presentation_url,
    donation_link,
    facebook_url,
    instagram_url,
    twitter_url,
    linkedin_url,
    youtube_url,
    ein,
    tax_exempt_status,
    primary_color,
    secondary_color,
    is_active
) VALUES (
    'Islamic Circle of North America',
    'nonprofit',
    '718-658-1199',
    'info@icna.org',
    'https://www.icna.org',
    '166-26 89th Avenue',
    'Jamaica',
    'NY',
    '11432',
    'https://www.icna.org/wp-content/uploads/2020/01/icna-logo.png',
    'Building Better Communities',
    'To build better communities through humanitarian relief, social services, and Islamic education.',
    'The Islamic Circle of North America (ICNA) is a leading American Muslim organization dedicated to the betterment of society through the application of Islamic values. Since 1968, ICNA has worked to build relations between communities by devoting itself to education, outreach, social services and relief efforts.',
    JSON_ARRAY(
        'Established in 1968 with 50+ years of community service',
        'Operating humanitarian programs in 30+ countries worldwide',
        'Providing Zakat and Sadaqah distribution services to those in need',
        'Youth development through Young Muslims (YM) and Young Muslims Sisters (YW) programs',
        'Educational initiatives including weekend Islamic schools and adult education',
        'Emergency relief and disaster response through ICNA Relief',
        'Dawah and outreach programs across North America',
        'Women\'s empowerment through Sisters Wing initiatives',
        'Interfaith dialogue and community bridge-building',
        'Annual conventions bringing together 20,000+ attendees'
    ),
    'ICNA is a leading American Muslim organization dedicated to building better communities through faith-based social services, humanitarian relief, and educational programs. Since 1968, we\'ve been serving millions across North America and globally through initiatives like ICNA Relief, Young Muslims, and our extensive network of educational and outreach programs.',
    'Our current outreach goals include: expanding partnerships with 100 new mosques this year, increasing Ramadan programs in underserved communities, launching new youth mentorship initiatives, and strengthening our disaster relief response capabilities nationwide.',
    'https://www.icna.org/wp-content/uploads/icna-brochure.pdf',
    'https://www.icna.org/presentations/about-icna.pptx',
    'https://www.icna.org/donate',
    'https://www.facebook.com/icnaorg',
    'https://www.instagram.com/icnaorg',
    'https://twitter.com/ICNAorg',
    'https://www.linkedin.com/company/icna',
    'https://www.youtube.com/user/icnatv',
    '11-2555065',
    '501c3',
    '#00693E',
    '#FDB913',
    1
);

-- Alternative example for a different organization:

INSERT INTO organizations (
    name,
    type,
    phone,
    email,
    website,
    tagline,
    mission_statement,
    talking_points,
    elevator_pitch,
    ein,
    tax_exempt_status,
    primary_color,
    secondary_color,
    is_active
) VALUES (
    'Muslim American Society',
    'nonprofit',
    '703-998-6525',
    'info@muslimamericansociety.org',
    'https://www.muslimamericansociety.org',
    'Serving Faith, Serving Humanity',
    'To establish Islam in America as a complete way of life.',
    JSON_ARRAY(
        'Nationwide network of local chapters and centers',
        'Annual convention with Islamic scholars and thought leaders',
        'Youth camps and leadership development programs',
        'Family counseling and social services',
        'Islamic education curriculum development',
        'Community organizing and civic engagement'
    ),
    'The Muslim American Society (MAS) is a religious and cultural organization established to spread Islamic knowledge and values. We work to build a positive Muslim identity in America through education, community service, and civic engagement.',
    '23-7259620',
    '501c3',
    '#006341',
    '#0078AE',
    1
);

-- To update an existing organization:

UPDATE organizations SET
    phone = '718-658-1199',
    email = 'info@icna.org',
    website = 'https://www.icna.org',
    tagline = 'Building Better Communities',
    mission_statement = 'To build better communities through humanitarian relief, social services, and Islamic education.',
    talking_points = JSON_ARRAY(
        'Established in 1968 with 50+ years of community service',
        'Operating humanitarian programs in 30+ countries worldwide',
        'Providing Zakat and Sadaqah distribution services',
        'Youth development through YM and YW programs',
        'Educational initiatives including weekend schools',
        'Emergency relief through ICNA Relief'
    ),
    elevator_pitch = 'ICNA is a leading American Muslim organization dedicated to building better communities through faith-based social services, humanitarian relief, and educational programs.',
    primary_color = '#00693E',
    secondary_color = '#FDB913'
WHERE id = 1;

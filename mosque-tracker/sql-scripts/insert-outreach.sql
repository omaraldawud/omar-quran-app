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



select * from outreach_logs;
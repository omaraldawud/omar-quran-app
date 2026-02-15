<?php
header('Content-Type: application/json');
$allowedOrigins = [
    "http://localhost:5173",
    "https://hostitwise.net"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

// GET - Retrieve organization profile
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $orgId = $_GET['id'] ?? null;

        if (!$orgId) {
            http_response_code(400);
            echo json_encode(['error' => 'Organization ID is required']);
            exit;
        }

        $stmt = $pdo->prepare("
            SELECT 
                id, name, type, phone, email, website, 
                street, city, state, zip, logo_url, tagline,
                mission_statement, description, talking_points, guidelines,
                elevator_pitch, outreach_goals, brochure_url,
                presentation_url, donation_link, facebook_url,
                instagram_url, twitter_url, linkedin_url, youtube_url,
                ein, tax_exempt_status, primary_color, secondary_color,
                is_active, created_at, updated_at
            FROM organizations
            WHERE id = ?
        ");
        
        $stmt->execute([$orgId]);
        $org = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$org) {
            http_response_code(404);
            echo json_encode(['error' => 'Organization not found']);
            exit;
        }

        // Decode JSON fields
        if ($org['talking_points']) {
            $org['talking_points'] = json_decode($org['talking_points'], true);
        }

        echo json_encode($org);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// PUT - Update organization profile
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    try {
        $orgId = $data['id'] ?? null;

        if (!$orgId) {
            http_response_code(400);
            echo json_encode(['error' => 'Organization ID is required']);
            exit;
        }

        // Prepare talking points as JSON if provided
        $talkingPoints = null;
        if (isset($data['talking_points']) && is_array($data['talking_points'])) {
            $talkingPoints = json_encode($data['talking_points']);
        }

        $stmt = $pdo->prepare("
            UPDATE organizations SET
                name = ?,
                type = ?,
                phone = ?,
                email = ?,
                website = ?,
                street = ?,
                city = ?,
                state = ?,
                zip = ?,
                logo_url = ?,
                tagline = ?,
                mission_statement = ?,
                description = ?,
                talking_points = ?,
                guidelines = ?,
                elevator_pitch = ?,
                outreach_goals = ?,
                brochure_url = ?,
                presentation_url = ?,
                donation_link = ?,
                facebook_url = ?,
                instagram_url = ?,
                twitter_url = ?,
                linkedin_url = ?,
                youtube_url = ?,
                ein = ?,
                tax_exempt_status = ?,
                primary_color = ?,
                secondary_color = ?,
               
                updated_at = NOW()
            WHERE id = ?
        ");

        $stmt->execute([
            $data['name'],
            $data['type'],
            $data['phone'] ?? null,
            $data['email'],
            $data['website'] ?? null,
            $data['street'] ?? null,
            $data['city'] ?? null,
            $data['state'] ?? null,
            $data['zip'] ?? null,
            $data['logo_url'] ?? null,
            $data['tagline'] ?? null,
            $data['mission_statement'] ?? null,
            $data['description'] ?? null,
            $talkingPoints,
            // $guidelines,
            $data['guidelines'] ?? null,

            $data['elevator_pitch'] ?? null,
            $data['outreach_goals'] ?? null,
            $data['brochure_url'] ?? null,
            $data['presentation_url'] ?? null,
            $data['donation_link'] ?? null,
            $data['facebook_url'] ?? null,
            $data['instagram_url'] ?? null,
            $data['twitter_url'] ?? null,
            $data['linkedin_url'] ?? null,
            $data['youtube_url'] ?? null,
            $data['ein'] ?? null,
            $data['tax_exempt_status'] ?? null,
            $data['primary_color'] ?? '#28a745',
            $data['secondary_color'] ?? '#007bff',




            $orgId
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Organization profile updated successfully!'
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>

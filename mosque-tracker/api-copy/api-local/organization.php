<?php
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

// GET - Fetch organization details by ID
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $org_id = $_GET['id'] ?? null;
    
    if (!$org_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Organization ID is required']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("
            SELECT 
                id,
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
                is_active,
                created_at,
                updated_at
            FROM organizations
            WHERE id = ? AND is_active = 1
        ");
        
        $stmt->execute([$org_id]);
        $organization = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$organization) {
            http_response_code(404);
            echo json_encode(['error' => 'Organization not found']);
            exit;
        }
        
        // Decode JSON fields
        if ($organization['talking_points']) {
            $organization['talking_points'] = json_decode($organization['talking_points']);
        }
        
        echo json_encode($organization);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// PUT - Update organization details
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $org_id = $data['id'] ?? null;
    
    if (!$org_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Organization ID is required']);
        exit;
    }
    
    try {
        // Encode talking_points if it's an array
        if (isset($data['talking_points']) && is_array($data['talking_points'])) {
            $data['talking_points'] = json_encode($data['talking_points']);
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
                secondary_color = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['name'],
            $data['type'],
            $data['phone'] ?? null,
            $data['email'] ?? null,
            $data['website'] ?? null,
            $data['street'] ?? null,
            $data['city'] ?? null,
            $data['state'] ?? null,
            $data['zip'] ?? null,
            $data['logo_url'] ?? null,
            $data['tagline'] ?? null,
            $data['mission_statement'] ?? null,
            $data['description'] ?? null,
            $data['talking_points'] ?? null,
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
            $org_id
        ]);
        
        // Fetch and return updated organization
        $stmt = $pdo->prepare("SELECT * FROM organizations WHERE id = ?");
        $stmt->execute([$org_id]);
        $organization = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($organization['talking_points']) {
            $organization['talking_points'] = json_decode($organization['talking_points']);
        }
        
        echo json_encode($organization);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// POST - Create new organization
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        // Encode talking_points if it's an array
        if (isset($data['talking_points']) && is_array($data['talking_points'])) {
            $data['talking_points'] = json_encode($data['talking_points']);
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO organizations (
                name, type, phone, email, website, street, city, state, zip,
                logo_url, tagline, mission_statement, description, talking_points,
                elevator_pitch, outreach_goals, brochure_url, presentation_url,
                donation_link, facebook_url, instagram_url, twitter_url,
                linkedin_url, youtube_url, ein, tax_exempt_status,
                primary_color, secondary_color
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['name'],
            $data['type'] ?? 'nonprofit',
            $data['phone'] ?? null,
            $data['email'] ?? null,
            $data['website'] ?? null,
            $data['street'] ?? null,
            $data['city'] ?? null,
            $data['state'] ?? null,
            $data['zip'] ?? null,
            $data['logo_url'] ?? null,
            $data['tagline'] ?? null,
            $data['mission_statement'] ?? null,
            $data['description'] ?? null,
            $data['talking_points'] ?? null,
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
            $data['secondary_color'] ?? '#007bff'
        ]);
        
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM organizations WHERE id = ?");
        $stmt->execute([$id]);
        $organization = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($organization['talking_points']) {
            $organization['talking_points'] = json_decode($organization['talking_points']);
        }
        
        echo json_encode($organization);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}
?>

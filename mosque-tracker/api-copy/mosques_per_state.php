<?php
// Configuration
$inputFile = 'datasets/masjids-list_il.csv'; // path to your CSV or TSV file
$delimiter = ","; // "\t" for TSV, "," for CSV

// Check if file exists
if (!file_exists($inputFile)) {
    die("File not found: $inputFile\n");
}

// Open the input file
$handle = fopen($inputFile, 'r');
if (!$handle) {
    die("Cannot open file: $inputFile\n");
}

// Read the header row
$header = fgetcsv($handle, 0, $delimiter);
if (!$header) {
    die("Empty file or invalid format\n");
}

// Prepare array to store INSERTs grouped by state
$stateInserts = [];

// Process each row
while (($row = fgetcsv($handle, 0, $delimiter)) !== false) {
    $record = array_combine($header, $row);
    if (!$record) continue; // skip invalid rows

    $name = addslashes($record['name']);
    $street = addslashes($record['street']);
    $city = addslashes($record['city']);
    $state = strtoupper(trim($record['state'])); // state code
    $zip = addslashes($record['zip']);

    $sql = "INSERT INTO mosques (name, street, city, state, zip) VALUES ('$name', '$street', '$city', '$state', '$zip');\n";

    $stateInserts[$state][] = $sql;
}

fclose($handle);

// Write inserts to separate files by state
foreach ($stateInserts as $state => $inserts) {
    $filename = "mosques_{$state}.sql";
    file_put_contents($filename, implode("", $inserts));
    echo "Written " . count($inserts) . " inserts to $filename\n";
}

echo "All done!\n";
?>

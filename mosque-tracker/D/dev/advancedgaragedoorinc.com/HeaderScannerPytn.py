import os
import re
import json

# ========== Configuration ==========
project_dir = r"D:\dev\hostitwise-sites\advancedgaragedoorinc.com"
file_extensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.htm', '.php']
ignore_folders = [
    'node_modules', 'dist', 'build', 'images', 'img', 'assets', 'css', 'data'
]
ignore_files = ['Header.jsx', 'Header.tsx', 'header.php']  # main <h1> templates
auto_fix = False  # Set True to apply changes immediately
export_json = True  # Export scan results
report_file = "heading_report.json"
# ==================================

heading_pattern = re.compile(r'<(h[1-6])\b([^>]*)>(.*?)</\1>', re.IGNORECASE | re.DOTALL)

scan_results = []

def scan_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    file_report = []
    first_h1_seen = False
    for i, line in enumerate(lines, 1):
        for match in heading_pattern.finditer(line):
            tag = match.group(1).lower()
            extra_h1 = False
            if tag == 'h1':
                if not first_h1_seen:
                    first_h1_seen = True
                else:
                    extra_h1 = True
            file_report.append({
                'line': i,
                'tag': tag,
                'text': match.group(3).strip(),
                'extra_h1': extra_h1
            })
    return file_report, lines

def preview_fix(lines):
    """Return a list of changes that would happen if we auto-fix extra <h1>."""
    first_seen = False
    changes = []
    for i, line in enumerate(lines, 1):
        def replacer(match):
            nonlocal first_seen
            tag = match.group(1).lower()
            if tag == 'h1':
                if not first_seen:
                    first_seen = True
                    return match.group(0)
                else:
                    changes.append(f"Line {i}: <h1> → <h2>")
                    return f"<h2{match.group(2)}>{match.group(3)}</h2>"
            return match.group(0)
        heading_pattern.sub(replacer, line)
    return changes

def fix_file(file_path, lines):
    first_seen = False
    new_lines = []
    for line in lines:
        def replacer(match):
            nonlocal first_seen
            tag = match.group(1).lower()
            if tag == 'h1':
                if not first_seen:
                    first_seen = True
                    return match.group(0)
                else:
                    return f"<h2{match.group(2)}>{match.group(3)}</h2>"
            return match.group(0)
        new_lines.append(heading_pattern.sub(replacer, line))
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"   ✅ Fixed extra <h1> in {file_path}")

print("🔎 Scanning project for headings...\n")

for root, dirs, files in os.walk(project_dir):
    # Skip ignored folders
    if any(ignored.lower() in root.lower() for ignored in ignore_folders):
        continue
    for file in files:
        if not any(file.lower().endswith(ext) for ext in file_extensions):
            continue
        if file in ignore_files:
            continue
        file_path = os.path.join(root, file)
        file_report, lines = scan_file(file_path)
        if file_report:
            scan_results.append({'file': file_path, 'headings': file_report, 'lines': lines})

# Display preview of changes
has_changes = False
for entry in scan_results:
    file_path = entry['file']
    lines = entry['lines']
    changes = preview_fix(lines)
    if changes:
        has_changes = True
        print(f"\nFile: {file_path}")
        for c in changes:
            print("  " + c)

if not has_changes:
    print("\n✅ No extra <h1> tags found outside header templates.")
else:
    if export_json:
        # Prepare JSON report without lines (too large), only headings info
        json_report = [{'file': e['file'], 'headings': e['headings']} for e in scan_results]
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(json_report, f, indent=2)
        print(f"\n📄 JSON report saved to {report_file}")

    # Ask before applying changes
    if not auto_fix:
        choice = input("\nDo you want to auto-convert extra <h1> → <h2>? (y/n): ").strip().lower()
        if choice == 'y':
            auto_fix = True

    if auto_fix:
        for entry in scan_results:
            file_path = entry['file']
            lines = entry['lines']
            fix_file(file_path, lines)
        print("\n🎉 All done! Extra <h1> tags replaced with <h2>.")
    else:
        print("\n❌ No changes applied.")

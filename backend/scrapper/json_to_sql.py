import json

# Load the JSON data
with open('internships.json', 'r', encoding='utf-8') as file:
    internships = json.load(file)

sql_statements = []

for item in internships:
    # Helper to safely format values for raw SQL
    def format_value(val):
        if val is None:
            return "NULL"
        elif isinstance(val, bool):
            return "TRUE" if val else "FALSE"
        elif isinstance(val, (list, dict)):
            # Convert lists/dicts to JSON string and escape single quotes
            json_str = json.dumps(val).replace("'", "''")
            return f"'{json_str}'"
        else:
            # Escape single quotes in strings (e.g., "company's" -> "company''s")
            clean_str = str(val).replace("'", "''")
            return f"'{clean_str}'"

    # Map JSON fields to database columns
    values = [
        format_value(item.get('internship_id')),
        format_value(item.get('card_id')),
        format_value(item.get('title')),
        format_value(item.get('company')),
        format_value(item.get('location')),
        format_value(item.get('stipend')),
        format_value(item.get('duration')),
        format_value(item.get('description')),
        format_value(item.get('skills')),
        format_value(item.get('posted')),          # Maps to posted_date
        format_value(item.get('actively_hiring')),
        format_value(item.get('logo_url')),
        format_value(item.get('detail_url')),
        format_value(item.get('employment_type')),
        format_value(item.get('source_page'))
    ]

    # Construct the SQL query
    sql = f"""INSERT INTO internships (
        internship_id, card_id, title, company, location, stipend, duration, 
        description, skills, posted_date, actively_hiring, logo_url, detail_url, 
        employment_type, source_page
    ) VALUES ({', '.join(values)});"""
    
    sql_statements.append(sql)

# Save to a .sql file
with open('insert_internships.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_statements))

print(f"Successfully generated {len(sql_statements)} SQL INSERT statements in 'insert_internships.sql'")


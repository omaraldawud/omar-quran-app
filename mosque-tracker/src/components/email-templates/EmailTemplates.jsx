import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";

export default function EmailTemplates({ onSelectTemplate }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Templates are a global pool — no org/mosque filter needed.
  // Fetch once on mount.
  useEffect(() => {
    fetch("http://localhost/api/email_templates.php", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch templates");
        return res.json();
      })
      .then((data) => {
        // Check if data.templates exists and is an array
        if (data.success && Array.isArray(data.templates)) {
          setTemplates(data.templates);
        } else {
          setTemplates([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching templates:", err);
        setTemplates([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading templates...</p>;
  if (!templates.length) return <p>No email templates available.</p>;

  return (
    <div className="email-templates">
      <h5>Email Templates</h5>
      <ListGroup>
        {templates.map((t) => (
          <ListGroup.Item
            key={t.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              {t.name} <small className="text-muted">({t.purpose})</small>
            </span>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => onSelectTemplate && onSelectTemplate(t)}
            >
              Preview
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

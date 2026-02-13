import { Button, ListGroup } from "react-bootstrap";

export default function EmailTemplates({ templates = [], onSelectTemplate }) {
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

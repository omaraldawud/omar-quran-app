import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function EmailPreviewModal({
  show = true,
  onClose,
  onSend,
  template,
  previewBody,
  masjid,
  user,
}) {
  const [organization, setOrganization] = useState(null);

  // Fetch organization based on user's organization_id
  useEffect(() => {
    if (user?.organization_id) {
      fetch(
        `https://hostitwise.net/qt/api/organization.php?id=${user.organization_id}`,
        {
          method: "GET",
          credentials: "include", // send cookies if needed
        },
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch organization");
          return res.json();
        })
        .then((data) => setOrganization(data))
        .catch((err) => console.error("Error fetching organization:", err));
    }
  }, [user?.organization_id]);

  if (!template) return null;

  // Replace placeholders in subject and body
  const subject = template.subject
    .replace(/\{masjid_name\}/g, masjid?.name || "")
    .replace(/\{contact_name\}/g, masjid?.contact_name || "")
    .replace(/\{user_name\}/g, user?.name || user?.user_name || "")
    .replace(/\{organization.name\}/g, organization?.name || "");

  const body = previewBody
    .replace(/\{masjid_name\}/g, masjid?.name || "")
    .replace(/\{contact_name\}/g, masjid?.contact_name || "")
    .replace(/\{user_name\}/g, user?.name || user?.user_name || "")
    .replace(/\{organization.name\}/g, organization?.name || "");

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Preview: {template.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
          To: <small className="text-muted">{masjid.contact_name}</small>
        </h6>
        <h6>
          Purpose: <small className="text-muted">{template.purpose}</small>
        </h6>
        <h6>
          Subject: <small className="text-muted">{subject}</small>
        </h6>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={onSend}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

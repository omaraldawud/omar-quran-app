import { Modal, Button } from "react-bootstrap";

export default function EmailPreviewModal({
  show = true,
  onClose,
  onSend,
  template,
  previewBody,
}) {
  if (!template) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Preview: {template.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Purpose: <small className="text-muted">{template.purpose}</small></h6>
        <h5 className="mt-2">Subject: {template.subject}</h5>
        <hr />
        {/* Render as HTML — templates store body_html */}
        <div dangerouslySetInnerHTML={{ __html: previewBody }} />
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

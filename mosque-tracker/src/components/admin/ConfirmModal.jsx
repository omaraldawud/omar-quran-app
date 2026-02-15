import { FaTimes } from "react-icons/fa";

export default function ConfirmModal({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "#ef4444",
  processing = false,
}) {
  if (!show) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onCancel}></div>
      <div className="confirm-modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onCancel}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel} disabled={processing}>
            {cancelText}
          </button>
          <button
            className="btn-danger"
            onClick={onConfirm}
            disabled={processing}
            style={{ backgroundColor: confirmColor }}
          >
            {processing ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </>
  );
}

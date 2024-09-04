import "./ConfirmDialog.css";

// eslint-disable-next-line react/prop-types
function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;
  
    return (
      <div className="confirmation-dialog-overlay">
        <div className="confirmation-dialog">
          <p>{message}</p>
          <div className="confirmation-dialog-buttons">
            <button onClick={onConfirm} className="confirm-button">Confirmar</button>
            <button onClick={onCancel} className="cancel-button">Cancelar</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConfirmationDialog;
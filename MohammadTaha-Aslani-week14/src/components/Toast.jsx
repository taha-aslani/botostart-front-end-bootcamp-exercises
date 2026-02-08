import React from 'react';

export function Toast({ message, onUndo }) {
  return (
    <div className="toast-wrap">
      <div className="toast">
        <span className="toast-message">{message}</span>
        {onUndo && (
          <button type="button" className="toast-undo" onClick={onUndo}>
            بازگردانی
          </button>
        )}
      </div>
    </div>
  );
}

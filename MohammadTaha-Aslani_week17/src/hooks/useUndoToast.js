import { useEffect, useState } from 'react';

const UNDO_DURATION_MS = 5000;

export function useUndoToast() {
  const [toast, setToast] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  function clearToast() {
    setTimeoutId((prev) => {
      if (prev) clearTimeout(prev);
      return null;
    });
    setToast(null);
  }

  function showToast(message, onUndo) {
    setToast({ message, onUndo });
    setTimeoutId((prev) => {
      if (prev) clearTimeout(prev);
      return setTimeout(() => {
        setToast(null);
        setTimeoutId(null);
      }, UNDO_DURATION_MS);
    });
  }

  return { toast, showToast, clearToast };
}

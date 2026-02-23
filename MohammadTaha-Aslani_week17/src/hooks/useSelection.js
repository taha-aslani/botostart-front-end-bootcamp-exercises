import { useEffect, useMemo, useState } from 'react';

export function useSelection(items) {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const allSelected = items.length > 0 && selectedIds.size === items.length;
  const someSelected = selectedIds.size > 0;

  useEffect(() => {
    const el = document.getElementById('select-all-checkbox');
    if (el) el.indeterminate = someSelected && !allSelected;
  }, [someSelected, allSelected]);

  const selectedCount = useMemo(
    () => items.filter((c) => selectedIds.has(c.id)).length,
    [items, selectedIds],
  );

  function toggleSelect(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll(checked) {
    if (checked) {
      setSelectedIds(new Set(items.map((c) => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  }

  function removeFromSelection(ids) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  }

  return {
    selectedIds,
    selectedCount,
    allSelected,
    toggleSelect,
    selectAll,
    removeFromSelection,
  };
}

import { toPersianNumber } from '../utils/persianNumbers';

export function ContactsToolbar({
  filteredCount,
  selectedCount,
  allSelected,
  onAdd,
  onSelectAll,
  onDelete,
}) {
  return (
    <div className="toolbar">
      <button type="button" className="btn-add" onClick={onAdd}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        افزودن مخاطب
      </button>
      <div className="toolbar-actions">
        {filteredCount > 0 && (
          <label className="select-all">
            <input
              id="select-all-checkbox"
              type="checkbox"
              checked={allSelected}
              onChange={() => onSelectAll(filteredCount > 0 && !allSelected)}
              aria-label="انتخاب همه"
            />
            انتخاب همه
          </label>
        )}
        {selectedCount > 0 && (
          <button type="button" className="btn-danger" onClick={onDelete}>
            حذف ({toPersianNumber(selectedCount)})
          </button>
        )}
      </div>
    </div>
  );
}

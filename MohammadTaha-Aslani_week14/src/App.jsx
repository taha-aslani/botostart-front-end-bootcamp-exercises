import React, { useState, useEffect } from 'react';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { SearchBar } from './components/SearchBar';
import { Toast } from './components/Toast';
import { useContacts } from './hooks/useContacts';
import { toPersianNumber } from './utils/persianNumbers';

const UNDO_DURATION_MS = 5000;

function filterContacts(contacts, query) {
  if (!query.trim()) return contacts;
  const q = query.trim().toLowerCase();
  return contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))),
  );
}

export default function App() {
  const {
    contacts,
    addContact,
    updateContact,
    removeContacts,
    restoreContacts,
  } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [deleteSingleContact, setDeleteSingleContact] = useState(null);
  const [toast, setToast] = useState(null);
  const [undoTimeoutId, setUndoTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (undoTimeoutId) clearTimeout(undoTimeoutId);
    };
  }, [undoTimeoutId]);

  const filteredContacts = filterContacts(contacts, searchQuery);

  const allSelected =
    filteredContacts.length > 0 && selectedIds.size === filteredContacts.length;
  const someSelected = selectedIds.size > 0;

  useEffect(() => {
    const el = document.getElementById('select-all-checkbox');
    if (el) el.indeterminate = someSelected && !allSelected;
  }, [someSelected, allSelected]);

  const selectedCount = filteredContacts.filter((c) =>
    selectedIds.has(c.id),
  ).length;

  const editingContact = editContactId
    ? contacts.find((c) => c.id === editContactId)
    : null;

  function clearToast() {
    setUndoTimeoutId((prev) => {
      if (prev) clearTimeout(prev);
      return null;
    });
    setToast(null);
  }

  function handleAddContact(data) {
    addContact(data);
    setShowAddModal(false);
  }

  function handleEdit(contact) {
    setEditContactId(contact.id);
  }

  function handleUpdateContact(data) {
    if (!data.id) return;
    const previous = { ...editingContact };
    updateContact(data.id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    setEditContactId(null);
    setToast({
      message: 'مخاطب ویرایش شد',
      onUndo: () => {
        updateContact(data.id, previous);
        clearToast();
      },
    });
    setUndoTimeoutId((prev) => {
      if (prev) clearTimeout(prev);
      return setTimeout(() => {
        setToast(null);
        setUndoTimeoutId(null);
      }, UNDO_DURATION_MS);
    });
  }

  function handleDeleteOne(contact) {
    setDeleteSingleContact(contact);
  }

  function handleConfirmDeleteOne() {
    const contact = deleteSingleContact;
    if (!contact) return;
    const deleted = [contact];
    removeContacts([contact.id]);
    setDeleteSingleContact(null);
    setToast({
      message: '۱ مخاطب حذف شد',
      onUndo: () => {
        restoreContacts(deleted);
        clearToast();
      },
    });
    setUndoTimeoutId((prev) => {
      if (prev) clearTimeout(prev);
      return setTimeout(() => {
        setToast(null);
        setUndoTimeoutId(null);
      }, UNDO_DURATION_MS);
    });
  }

  function handleToggleSelect(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSelectAll(checked) {
    if (checked) {
      setSelectedIds(new Set(filteredContacts.map((c) => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  }

  function handleDeleteClick() {
    if (selectedCount === 0) return;
    setShowDeleteModal(true);
  }

  function handleConfirmDelete() {
    const toDelete = filteredContacts.filter((c) => selectedIds.has(c.id));
    const deleted = [...toDelete];
    const ids = deleted.map((c) => c.id);
    removeContacts(ids);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    setShowDeleteModal(false);

    const count = deleted.length;
    const message =
      count === 1
        ? '۱ مخاطب حذف شد'
        : `${toPersianNumber(count)} مخاطب حذف شدند`;

    const doUndo = () => {
      restoreContacts(deleted);
      clearToast();
    };

    setToast({ message, onUndo: doUndo });
    setUndoTimeoutId((prev) => {
      if (prev) clearTimeout(prev);
      return setTimeout(() => {
        setToast(null);
        setUndoTimeoutId(null);
      }, UNDO_DURATION_MS);
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          مخاطبین
        </h1>
      </header>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="جستجو در نام، ایمیل یا شماره تلفن..."
      />

      <div className="toolbar">
        <button
          type="button"
          className="btn-add"
          onClick={() => setShowAddModal(true)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          افزودن مخاطب
        </button>
        <div className="toolbar-actions">
          {filteredContacts.length > 0 && (
            <label className="select-all">
              <input
                id="select-all-checkbox"
                type="checkbox"
                checked={allSelected}
                onChange={() =>
                  handleSelectAll(filteredContacts.length > 0 && !allSelected)
                }
                aria-label="انتخاب همه"
              />
              انتخاب همه
            </label>
          )}
          {selectedCount > 0 && (
            <button
              type="button"
              className="btn-danger"
              onClick={handleDeleteClick}
            >
              حذف ({toPersianNumber(selectedCount)})
            </button>
          )}
        </div>
      </div>

      <ContactList
        contacts={filteredContacts}
        selectedIds={selectedIds}
        onToggle={handleToggleSelect}
        onEdit={handleEdit}
        onDelete={handleDeleteOne}
      />

      {showAddModal && (
        <Modal title="افزودن مخاطب جدید" onClose={() => setShowAddModal(false)}>
          <ContactForm
            onSubmit={handleAddContact}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}

      {editingContact && (
        <Modal title="ویرایش مخاطب" onClose={() => setEditContactId(null)}>
          <ContactForm
            initialValues={editingContact}
            submitLabel="ذخیره تغییرات"
            onSubmit={handleUpdateContact}
            onCancel={() => setEditContactId(null)}
          />
        </Modal>
      )}

      {deleteSingleContact && (
        <Modal title="حذف مخاطب" onClose={() => setDeleteSingleContact(null)}>
          <div className="modal-body confirm">
            <div className="confirm-icon">
              <svg
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 10V14M12.5 17V15.5M14.2483 5.64697L20.8493 17.5287C21.5899 18.8618 20.6259 20.5 19.101 20.5H5.89903C4.37406 20.5 3.41013 18.8618 4.15072 17.5287L10.7517 5.64697C11.5137 4.27535 13.4863 4.27535 14.2483 5.64697Z"
                  stroke="#dc2626"
                  stroke-width="1.2"
                />
              </svg>
            </div>
            <p className="confirm-message">
              آیا مطمئن هستید که می‌خواهید «{deleteSingleContact.name}» را حذف
              کنید؟
            </p>
            <div
              className="modal-actions"
              style={{ justifyContent: 'center', marginTop: '1.25rem' }}
            >
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeleteSingleContact(null)}
              >
                انصراف
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDeleteOne}
              >
                حذف
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal title="حذف مخاطبین" onClose={() => setShowDeleteModal(false)}>
          <div className="modal-body confirm">
            <div className="confirm-icon">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 10V14M12.5 17V15.5M14.2483 5.64697L20.8493 17.5287C21.5899 18.8618 20.6259 20.5 19.101 20.5H5.89903C4.37406 20.5 3.41013 18.8618 4.15072 17.5287L10.7517 5.64697C11.5137 4.27535 13.4863 4.27535 14.2483 5.64697Z"
                  stroke="#dc2626"
                  stroke-width="1.2"
                />
              </svg>
            </div>
            <p className="confirm-message">
              آیا مطمئن هستید که می‌خواهید {toPersianNumber(selectedCount)}{' '}
              مخاطب انتخاب شده را حذف کنید؟
            </p>
            <div
              className="modal-actions"
              style={{ justifyContent: 'center', marginTop: '1.25rem' }}
            >
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                انصراف
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDelete}
              >
                حذف همه
              </button>
            </div>
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast.message} onUndo={toast.onUndo} />}
    </div>
  );
}

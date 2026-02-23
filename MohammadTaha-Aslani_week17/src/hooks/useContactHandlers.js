import { deleteManyMessage, deleteOneMessage } from '../utils/deleteMessages';

export function useEditHandlers({ addContact, updateContact, editingContact, modals, toast }) {
  function handleAddContact(data) {
    addContact(data);
    modals.closeAddModal();
  }

  function handleEdit(contact) {
    modals.openEditModal(contact.id);
  }

  function handleUpdateContact(data) {
    if (!data.id) return;
    const previous = { ...editingContact };
    updateContact(data.id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    modals.closeEditModal();
    toast.showToast('مخاطب ویرایش شد', () => {
      updateContact(data.id, previous);
      toast.clearToast();
    });
  }

  return { handleAddContact, handleEdit, handleUpdateContact };
}

export function useDeleteHandlers({
  removeContacts,
  restoreContacts,
  selection,
  modals,
  toast,
  filteredContacts,
}) {
  function handleDeleteOne(contact) {
    modals.openDeleteOne(contact);
  }

  function handleConfirmDeleteOne() {
    const contact = modals.deleteSingleContact;
    if (!contact) return;
    const deleted = [contact];
    removeContacts([contact.id]);
    modals.closeDeleteOne();
    toast.showToast(deleteOneMessage, () => {
      restoreContacts(deleted);
      toast.clearToast();
    });
  }

  function handleDeleteClick(selectedCount) {
    if (selectedCount === 0) return;
    modals.openDeleteModal();
  }

  function handleConfirmDelete() {
    const toDelete = filteredContacts.filter((c) => selection.selectedIds.has(c.id));
    const deleted = [...toDelete];
    const ids = deleted.map((c) => c.id);
    removeContacts(ids);
    selection.removeFromSelection(ids);
    modals.closeDeleteModal();

    const message = deleteManyMessage(deleted.length);
    toast.showToast(message, () => {
      restoreContacts(deleted);
      toast.clearToast();
    });
  }

  return {
    handleDeleteOne,
    handleConfirmDeleteOne,
    handleDeleteClick,
    handleConfirmDelete,
  };
}

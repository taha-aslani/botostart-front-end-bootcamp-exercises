import { useContacts } from './useContacts';
import { useSearchFilter } from './useSearchFilter';
import { useSelection } from './useSelection';
import { useUndoToast } from './useUndoToast';
import { useContactModals } from './useContactModals';
import { useEditHandlers, useDeleteHandlers } from './useContactHandlers';

export function useContactsPage() {
  const { contacts, addContact, updateContact, removeContacts, restoreContacts } = useContacts();
  const search = useSearchFilter(contacts);
  const selection = useSelection(search.filteredContacts);
  const modals = useContactModals();
  const toast = useUndoToast();

  const editingContact = modals.editContactId
    ? contacts.find((c) => c.id === modals.editContactId)
    : null;

  const editHandlers = useEditHandlers({
    addContact,
    updateContact,
    editingContact,
    modals,
    toast,
  });

  const deleteHandlers = useDeleteHandlers({
    removeContacts,
    restoreContacts,
    selection,
    modals,
    toast,
    filteredContacts: search.filteredContacts,
  });

  return {
    searchQuery: search.searchQuery,
    setSearchQuery: search.setSearchQuery,
    filteredContacts: search.filteredContacts,
    selectedIds: selection.selectedIds,
    selectedCount: selection.selectedCount,
    allSelected: selection.allSelected,
    toggleSelect: selection.toggleSelect,
    selectAll: selection.selectAll,
    showAddModal: modals.showAddModal,
    showDeleteModal: modals.showDeleteModal,
    editingContact,
    deleteSingleContact: modals.deleteSingleContact,
    toast: toast.toast,
    openAddModal: modals.openAddModal,
    closeAddModal: modals.closeAddModal,
    closeEditModal: modals.closeEditModal,
    closeDeleteOne: modals.closeDeleteOne,
    closeDeleteMany: modals.closeDeleteModal,
    handleAddContact: editHandlers.handleAddContact,
    handleEdit: editHandlers.handleEdit,
    handleUpdateContact: editHandlers.handleUpdateContact,
    handleDeleteOne: deleteHandlers.handleDeleteOne,
    handleConfirmDeleteOne: deleteHandlers.handleConfirmDeleteOne,
    handleDeleteClick: () => deleteHandlers.handleDeleteClick(selection.selectedCount),
    handleConfirmDelete: deleteHandlers.handleConfirmDelete,
  };
}

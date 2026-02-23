import { useState } from 'react';

export function useContactModals() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [deleteSingleContact, setDeleteSingleContact] = useState(null);

  return {
    showAddModal,
    showDeleteModal,
    editContactId,
    deleteSingleContact,
    openAddModal: () => setShowAddModal(true),
    closeAddModal: () => setShowAddModal(false),
    openDeleteModal: () => setShowDeleteModal(true),
    closeDeleteModal: () => setShowDeleteModal(false),
    openEditModal: (id) => setEditContactId(id),
    closeEditModal: () => setEditContactId(null),
    openDeleteOne: (contact) => setDeleteSingleContact(contact),
    closeDeleteOne: () => setDeleteSingleContact(null),
  };
}

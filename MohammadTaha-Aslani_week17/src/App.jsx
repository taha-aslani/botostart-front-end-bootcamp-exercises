import { ContactList } from './components/ContactList';
import { SearchBar } from './components/SearchBar';
import { Toast } from './components/Toast';
import { ContactsToolbar } from './components/ContactsToolbar';
import { ContactsModals } from './components/ContactsModals';
import { useContactsPage } from './hooks/useContactsPage';

export default function App() {
  const {
    searchQuery,
    setSearchQuery,
    filteredContacts,
    selectedIds,
    allSelected,
    selectedCount,
    showAddModal,
    showDeleteModal,
    editingContact,
    deleteSingleContact,
    toast,
    openAddModal,
    closeAddModal,
    closeEditModal,
    closeDeleteOne,
    closeDeleteMany,
    handleAddContact,
    handleEdit,
    handleUpdateContact,
    handleDeleteOne,
    handleConfirmDeleteOne,
    toggleSelect,
    selectAll,
    handleDeleteClick,
    handleConfirmDelete,
  } = useContactsPage();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      <ContactsToolbar
        filteredCount={filteredContacts.length}
        selectedCount={selectedCount}
        allSelected={allSelected}
        onAdd={openAddModal}
        onSelectAll={selectAll}
        onDelete={handleDeleteClick}
      />

      <ContactList
        contacts={filteredContacts}
        selectedIds={selectedIds}
        onToggle={toggleSelect}
        onEdit={handleEdit}
        onDelete={handleDeleteOne}
      />

      <ContactsModals
        showAddModal={showAddModal}
        onCloseAdd={closeAddModal}
        onSubmitAdd={handleAddContact}
        editingContact={editingContact}
        onCloseEdit={closeEditModal}
        onSubmitEdit={handleUpdateContact}
        deleteSingleContact={deleteSingleContact}
        onCloseDeleteOne={closeDeleteOne}
        onConfirmDeleteOne={handleConfirmDeleteOne}
        showDeleteModal={showDeleteModal}
        onCloseDeleteMany={closeDeleteMany}
        onConfirmDeleteMany={handleConfirmDelete}
        selectedCount={selectedCount}
      />

      {toast && <Toast message={toast.message} onUndo={toast.onUndo} />}
    </div>
  );
}

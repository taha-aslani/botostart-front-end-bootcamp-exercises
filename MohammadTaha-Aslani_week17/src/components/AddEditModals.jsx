import { Modal } from './Modal';
import { ContactForm } from './ContactForm';

export function AddEditModals({
  showAddModal,
  onCloseAdd,
  onSubmitAdd,
  editingContact,
  onCloseEdit,
  onSubmitEdit,
}) {
  return (
    <>
      {showAddModal && (
        <Modal title="افزودن مخاطب جدید" onClose={onCloseAdd}>
          <ContactForm onSubmit={onSubmitAdd} onCancel={onCloseAdd} />
        </Modal>
      )}

      {editingContact && (
        <Modal title="ویرایش مخاطب" onClose={onCloseEdit}>
          <ContactForm
            initialValues={editingContact}
            submitLabel="ذخیره تغییرات"
            onSubmit={onSubmitEdit}
            onCancel={onCloseEdit}
          />
        </Modal>
      )}
    </>
  );
}

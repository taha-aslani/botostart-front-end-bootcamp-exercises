import { Modal } from './Modal';
import { toPersianNumber } from '../utils/persianNumbers';

export function DeleteModals({
  deleteSingleContact,
  onCloseDeleteOne,
  onConfirmDeleteOne,
  showDeleteModal,
  onCloseDeleteMany,
  onConfirmDeleteMany,
  selectedCount,
}) {
  return (
    <>
      {deleteSingleContact && (
        <Modal title="حذف مخاطب" onClose={onCloseDeleteOne}>
          <div className="modal-body confirm">
            <div className="confirm-icon">
              <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.5 10V14M12.5 17V15.5M14.2483 5.64697L20.8493 17.5287C21.5899 18.8618 20.6259 20.5 19.101 20.5H5.89903C4.37406 20.5 3.41013 18.8618 4.15072 17.5287L10.7517 5.64697C11.5137 4.27535 13.4863 4.27535 14.2483 5.64697Z"
                  stroke="#dc2626"
                  stroke-width="1.2"
                />
              </svg>
            </div>
            <p className="confirm-message">
              آیا مطمئن هستید که می‌خواهید «{deleteSingleContact.name}» را حذف کنید؟
            </p>
            <div
              className="modal-actions"
              style={{ justifyContent: 'center', marginTop: '1.25rem' }}
            >
              <button type="button" className="btn-secondary" onClick={onCloseDeleteOne}>
                انصراف
              </button>
              <button type="button" className="btn-danger" onClick={onConfirmDeleteOne}>
                حذف
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal title="حذف مخاطبین" onClose={onCloseDeleteMany}>
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
              آیا مطمئن هستید که می‌خواهید {toPersianNumber(selectedCount)} مخاطب انتخاب شده را حذف کنید؟
            </p>
            <div
              className="modal-actions"
              style={{ justifyContent: 'center', marginTop: '1.25rem' }}
            >
              <button type="button" className="btn-secondary" onClick={onCloseDeleteMany}>
                انصراف
              </button>
              <button type="button" className="btn-danger" onClick={onConfirmDeleteMany}>
                حذف همه
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

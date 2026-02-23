import { AddEditModals } from './AddEditModals';
import { DeleteModals } from './DeleteModals';

export function ContactsModals(props) {
  return (
    <>
      <AddEditModals {...props} />
      <DeleteModals {...props} />
    </>
  );
}

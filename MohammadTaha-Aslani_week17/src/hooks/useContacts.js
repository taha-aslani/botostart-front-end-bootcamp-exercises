import { useContactsActions, useContactsState } from '../context/contactsContext';

export function useContacts() {
  const { items, status, error } = useContactsState();
  const actions = useContactsActions();

  return {
    contacts: items,
    status,
    error,
    ...actions,
  };
}

import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'contacts-app-contacts';

function normalizeContactFields(contact) {
  return {
    name: (contact.name ?? '').trim(),
    email: (contact.email ?? '').trim(),
    phone: (contact.phone ?? '').trim(),
  };
}

export function useContacts() {
  const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, []);

  const addContact = (contact) => {
    const normalized = normalizeContactFields(contact);
    const newContact = {
      id: crypto.randomUUID(),
      ...normalized,
    };
    setContacts((prev) => [newContact, ...prev]);
    return newContact.id;
  };

  const updateContact = (id, updates) => {
    const normalized = normalizeContactFields(updates);
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          id: c.id,
          name: normalized.name,
          email: normalized.email,
          phone: normalized.phone,
        };
      })
    );
  };

  const removeContacts = (ids) => {
    const idSet = new Set(ids);
    setContacts((prev) => prev.filter((c) => !idSet.has(c.id)));
  };

  const restoreContacts = (contactsToRestore) => {
    setContacts((prev) => [...contactsToRestore, ...prev]);
  };

  return {
    contacts,
    addContact,
    updateContact,
    removeContacts,
    restoreContacts,
  };
}

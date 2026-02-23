import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../api/contactsApi';

const ContactsStateContext = createContext(null);
const ContactsActionsContext = createContext(null);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

function normalizeContactFields(contact) {
  return {
    name: (contact.name ?? '').trim(),
    email: (contact.email ?? '').trim(),
    phone: (contact.phone ?? '').trim(),
  };
}

function contactsReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, status: 'loading', error: null };
    case 'LOAD_SUCCESS':
      return { ...state, status: 'ready', items: action.payload, error: null };
    case 'LOAD_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'ADD':
      return { ...state, items: [action.payload, ...state.items] };
    case 'UPDATE':
      return {
        ...state,
        items: state.items.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'REMOVE': {
      const idSet = new Set(action.payload);
      return {
        ...state,
        items: state.items.filter((contact) => !idSet.has(contact.id)),
      };
    }
    case 'RESTORE':
      return { ...state, items: [...action.payload, ...state.items] };
    default:
      return state;
  }
}

export function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  const loadContacts = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const items = await fetchContacts();
      dispatch({ type: 'LOAD_SUCCESS', payload: items ?? [] });
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', payload: error?.message ?? 'Error' });
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const addContact = useCallback(async (contact) => {
    const normalized = normalizeContactFields(contact);
    const newContact = {
      id: crypto.randomUUID(),
      ...normalized,
    };
    await createContact(newContact);
    dispatch({ type: 'ADD', payload: newContact });
    return newContact.id;
  }, []);

  const updateContactById = useCallback(async (id, updates) => {
    const normalized = normalizeContactFields(updates);
    const updated = await updateContact(id, normalized);
    dispatch({ type: 'UPDATE', payload: updated });
  }, []);

  const removeContacts = useCallback(async (ids) => {
    await Promise.all(ids.map((id) => deleteContact(id)));
    dispatch({ type: 'REMOVE', payload: ids });
  }, []);

  const restoreContacts = useCallback(async (contactsToRestore) => {
    const normalized = contactsToRestore.map((contact) => ({
      id: contact.id,
      ...normalizeContactFields(contact),
    }));
    await Promise.all(normalized.map((contact) => createContact(contact)));
    dispatch({ type: 'RESTORE', payload: normalized });
  }, []);

  const actions = useMemo(
    () => ({
      addContact,
      updateContact: updateContactById,
      removeContacts,
      restoreContacts,
      reloadContacts: loadContacts,
    }),
    [addContact, updateContactById, removeContacts, restoreContacts, loadContacts]
  );

  return (
    <ContactsStateContext.Provider value={state}>
      <ContactsActionsContext.Provider value={actions}>
        {children}
      </ContactsActionsContext.Provider>
    </ContactsStateContext.Provider>
  );
}

export function useContactsState() {
  const context = useContext(ContactsStateContext);
  if (!context) {
    throw new Error('useContactsState must be used within ContactsProvider');
  }
  return context;
}

export function useContactsActions() {
  const context = useContext(ContactsActionsContext);
  if (!context) {
    throw new Error('useContactsActions must be used within ContactsProvider');
  }
  return context;
}

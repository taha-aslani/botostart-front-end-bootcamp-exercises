import { useMemo, useState } from 'react';
import { filterContacts } from '../utils/contactFilter';

export function useSearchFilter(contacts) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredContacts = useMemo(
    () => filterContacts(contacts, searchQuery),
    [contacts, searchQuery],
  );

  return { searchQuery, setSearchQuery, filteredContacts };
}

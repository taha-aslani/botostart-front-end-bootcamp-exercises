export function filterContacts(contacts, query) {
  if (!query.trim()) return contacts;
  const q = query.trim().toLowerCase();
  return contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))),
  );
}

const BASE_URL = 'http://localhost:3001';
const CONTACTS_URL = `${BASE_URL}/contacts`;

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = `Request failed: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export function fetchContacts() {
  return request(CONTACTS_URL);
}

export function createContact(contact) {
  return request(CONTACTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
}

export function updateContact(id, updates) {
  return request(`${CONTACTS_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

export function deleteContact(id) {
  return request(`${CONTACTS_URL}/${id}`, {
    method: 'DELETE',
  });
}

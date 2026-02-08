import React from 'react';
import { ContactItem } from './ContactItem';
import { toPersianNumber } from '../utils/persianNumbers';

export function ContactList({ contacts, selectedIds, onToggle, onEdit, onDelete }) {
  return (
    <>
      <div className="contact-list">
        {contacts.length === 0 ? (
          <p className="empty-state">مخاطبی یافت نشد.</p>
        ) : (
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              selected={selectedIds.has(contact.id)}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
      {contacts.length > 0 && (
        <p className="list-footer">{toPersianNumber(contacts.length)} مخاطب</p>
      )}
    </>
  );
}

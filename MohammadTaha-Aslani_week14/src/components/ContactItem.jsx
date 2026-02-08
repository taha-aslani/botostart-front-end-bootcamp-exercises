import React from 'react';
import { toPersianNumber } from '../utils/persianNumbers';

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function ContactItem({ contact, selected, onToggle, onEdit, onDelete }) {
  const displayPhone = contact.phone ? toPersianNumber(contact.phone) : null;

  return (
    <div className={`contact-item ${selected ? 'selected' : ''}`}>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(contact.id)}
        aria-label={`انتخاب ${contact.name}`}
      />
      <div className="contact-item-avatar">
        <UserIcon />
      </div>
      <div className="contact-item-body">
        <h3 className="contact-item-name">{contact.name}</h3>
        <div className="contact-item-details">
          {contact.phone && (
            <span>
              <PhoneIcon />
              <a href={`tel:${contact.phone}`}>{displayPhone}</a>
            </span>
          )}
          {contact.email && (
            <span>
              <MailIcon />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </span>
          )}
        </div>
      </div>
      <div className="contact-item-actions">
        <button
          type="button"
          className="btn-icon btn-edit"
          onClick={() => onEdit(contact)}
          aria-label="ویرایش"
        >
          <EditIcon />
        </button>
        <button
          type="button"
          className="btn-icon btn-delete"
          onClick={() => onDelete(contact)}
          aria-label="حذف"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

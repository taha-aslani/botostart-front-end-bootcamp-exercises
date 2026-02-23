import React, { useState } from 'react';
import { validateName, validateEmail, validatePhone } from '../utils/validators';
import { toEnglishNumber } from '../utils/persianNumbers';

export function ContactForm({ onSubmit, onCancel, initialValues, submitLabel = 'افزودن مخاطب' }) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [email, setEmail] = useState(initialValues?.email ?? '');
  const [phone, setPhone] = useState(initialValues?.phone ?? '');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameError = validateName(name);
    const emailError = email ? validateEmail(email) : null;
    const phoneError = phone ? validatePhone(phone) : null;

    if (nameError || emailError || phoneError) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError,
      });
      return;
    }

    const data = {
      name: name.trim(),
      email: email.trim(),
      phone: toEnglishNumber(phone.trim()) || phone.trim(),
    };
    if (initialValues?.id) data.id = initialValues.id;
    onSubmit(data);
  };

  const handleBlur = (field) => {
    if (field === 'name') setErrors((e) => ({ ...e, name: validateName(name) }));
    if (field === 'email') setErrors((e) => ({ ...e, email: email ? validateEmail(email) : null }));
    if (field === 'phone') setErrors((e) => ({ ...e, phone: phone ? validatePhone(phone) : null }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">نام</label>
          <input
            id="contact-name"
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="علی محمدی"
            autoFocus
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">ایمیل</label>
          <input
            id="contact-email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="ali@example.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">شماره تلفن</label>
          <input
            id="contact-phone"
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            انصراف
          </button>
          <button type="submit" className="btn-primary">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

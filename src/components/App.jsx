import React, { useState } from 'react';
import './styles.css';
import ContactList from './ContactList';

import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('')

  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    return parsedContacts;
  });
  // useEffect(() => {
  //   console.log('useEffect called');
  //   const stringifiedContacts = localStorage.getItem(contacts);
  //   const parcedContacts = JSON.parse(stringifiedContacts) ?? [];
  //   setContacts(parcedContacts);
  // }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const newId = nanoid();
    const newContact = { id: newId, name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    console.log('stringifiedContacts', stringifiedContacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const deleteItem = itemId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== itemId)
    );
  };
  const handleFilter = event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="app-container">
      <h2 className="app-title">Phonebook</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={event => setName(event.target.value)}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?[0-9\s\-\(\)]+"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={event => setNumber(event.target.value)}
          />
        </label>
        <div>
          <button type="submit">Додати</button>
        </div>
      </form>
      <h2 className="contacts-title">Contacts</h2>
      <label>
        Filter
        <input
          type="search"
          name="filter"
          value={filter}
          onChange={handleFilter}
        />
      </label>
      <div>
        <ContactList
          contacts={filteredContacts}
          onDeleteItem={deleteItem}
        />
        {/* <ul className="contact-list">
          {contacts.map(contact => (
            <li key={contact.id} className="contact-item">
              <p className="contact-name">Name: {contact.name}</p>
              <p className="contact-number">Number: {contact.number}</p>
              <button type="button" onClick={() => deleteItem(contact.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import './styles.css';
import ContactList from './ContactList/ContactList';
import FormInput from './Form/Form';
import { useEffect } from 'react';
import Filter from './Filter/Filter';

export default function App() {
  const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    return parsedContacts;
  });

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
  const handleFilter = filterValue => {
    setFilter(filterValue);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="app-container">
      <h2 className="app-title">Phonebook</h2>
      <FormInput
        className="form-container"
        contacts={contacts}
        setContacts={setContacts}
      />

      <h2 className="contacts-title">Contacts</h2>

      <Filter filter={filter} onFilterChange={handleFilter} />

      <div>
        <ContactList contacts={filteredContacts} onDeleteItem={deleteItem} />
      </div>
    </div>
  );
}

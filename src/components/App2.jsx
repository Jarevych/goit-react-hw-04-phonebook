import React, { useState } from 'react';
import ContactList from './ContactList';
import FormInput from './Form';
import './styles.css';


export default function App () {
 
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };
  // const addContact = newContact => {
  //   const { name, number } = newContact;
  //   const contactExists = contacts.some(
  //     contact =>
  //       contact.name.toLowerCase().includes(name.toLowerCase()) ||
  //       contact.number === number
  //   );
  //   if (contactExists) {
  //     alert(`"${name}"is already in contacts`);
  //     return;
  //   }
  //   this.setState(prevState => ({
  //     contacts: [...prevState.contacts, newContact],
  //     name: '',
  //     number: '',
  //   }));
  // };

  const handleFilter = e => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  };

  const deleteItem = itemId => {
    setContacts(prevState => 
      prevState.filter(contact => contact.id !== itemId),
    );
  };

  // componentDidMount() {
  //   const stringifiedContacts = localStorage.getItem('contacts');
  //   const parcedContacts = JSON.parse(stringifiedContacts) ?? [];
  //   this.setState({
  //     contacts: parcedContacts,
  //   });
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts.length !== prevState.contacts.length) {
  //     const stringifiedContacts = JSON.stringify(this.state.contacts);
  //     localStorage.setItem('contacts', stringifiedContacts);
  //   }
  // }

  
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    return (
      <div className="app-container">
        <h2 className="app-title">Phonebook</h2>
        <FormInput
addContact={addContact()}/>
        <h2 className="contacts-title">Contacts</h2>
        <label>
          Filter
          <input
            type="search"
            name="filter"
            value={filter}
            onChange={handleFilter()}
          />
        </label>
        <ContactList
          contacts={filteredContacts}
          onDeleteItem={deleteItem()}
        />
      </div>
    );
  }

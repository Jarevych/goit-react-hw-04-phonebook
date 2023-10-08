import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import InputName from './InputName';
import InputNumber from './InputNumber';
export default function FormInput({ contacts, setContacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const contactExist = contacts.some(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      );
   
      if (contactExist) {
        alert(`"${name}" is already in contacts`);
        return;
      }
    const newId = nanoid();
    const newContact = { id: newId, name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputName name={name} onChange={setName} />
      <InputNumber number={number} onChange={setNumber} />

     
      <div>
        <button type="submit">Додати</button>
      </div>
    </form>
  );
}

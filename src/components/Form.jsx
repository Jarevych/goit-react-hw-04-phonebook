import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import NameInput from './NameInput';
import NumberInput from './NumberInput';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      "^[a-zA-Zа-яА-ЯІіЇїҐґ' -\u0400-\u04FF]+$",
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      '\\+?[0-9\\s\\-\\(\\)]+',
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is required'),
});

function FormInput ({inputData}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
//  useEffect((e) => {
//   setName(e.target.element.name);
//   setNumber(e.target.element.number);

//  },[name, number]);

  const validateInput = () => {
    try {
      schema.validate({ name, number }, { abortEarly: false });
      return true;
    } catch (errors) {
      console.log(errors);
      alert('Validation failed. Please check the form for errors.');
      return false;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (await validateInput()) {
      // const { name, number } = { name, number };    
        const newId = nanoid();
      const newContact = { id: newId, name, number };
      // setContacts(prevContacts => [...prevContacts, newContact])
      inputData(newContact);
      setName('');
      setNumber('')
      // useState({ name: '', number: '' });
    }
  };
  // const handleInput = e => {
  //   const { name, value } = e.currentTarget;
  //   setName(value });
  // };

 

      return (
      <form className="form-container">
        <NameInput
          inputData={setName}
          userName={name}
        />
        <NumberInput
          inputData={setNumber}
          number={number}
        />
        <div>
          <button type="submit" onClick={handleSubmit}>
            Додати
          </button>
        </div>
      </form>
    );
  }


export default FormInput;

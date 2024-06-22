import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './PhonebookPage/ContactForm/ContactForm';
import ContactsList from './PhonebookPage/ContactsList/ContactsList';
import Filter from './PhonebookPage/Filter/Filter';

let INITIAL_STATE = JSON.parse(localStorage.getItem('contacts'))


class App extends Component {
  state = {
    contacts: [
      ...INITIAL_STATE
    ],
    filter: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const duplicateContact = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (duplicateContact) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = { name, number, id: nanoid() };
      const updatedContacts = [...contacts, newContact];

      this.setState({ contacts: updatedContacts });
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    }
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => {
      const updatedContacts = prevState.contacts.filter(contact => contact.id !== contactId);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      return { contacts: updatedContacts };
    });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <Section title='Phonebook'>
          <ContactForm handleSubmit={this.handleSubmit} />
        </Section>
        <Section title='Contacts'>
          <Filter filter={filter} handleChange={this.handleChange} />
          <ContactsList contacts={filteredContacts} handleDeleteContact={this.handleDeleteContact} />
        </Section>
      </>
    );
  }
}

export default App;

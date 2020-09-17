import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Alert from './Alert/Alert';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    alert: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  addContact = newContact => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === newContact.name)) {
      this.setState({ alert: true });
      setTimeout(() => this.setState({ alert: false }), 3000);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      });
    }
  };

  onChangeFilter = filter => {
    this.setState({ filter });
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );

    return (
      <div className="main-container">
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          unmountOnExit
          classNames="title"
        >
          <h1>Phonebook</h1>
        </CSSTransition>
        <CSSTransition
          in={this.state.alert}
          timeout={250}
          unmountOnExit
          classNames="alert"
        >
          <Alert />
        </CSSTransition>
        <ContactForm onAddContact={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        {contacts.length === 0 ? <p>No contacts...</p> : null}
        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          unmountOnExit
          classNames="filter"
        >
          <Filter value={filter} onChangeFilter={this.onChangeFilter} />
        </CSSTransition>
        <ContactsList
          contacts={filteredContacts}
          onRemoveContact={this.removeContact}
        ></ContactsList>
      </div>
    );
  }
}

export default App;

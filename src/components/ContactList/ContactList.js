import React from 'react';
import PropTypes from 'prop-types';
import ContactsItem from '../ContactsItem/ContactsItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './ContactList.module.css';

function ContactsList({ contacts, onRemoveContact }) {
  return (
    <TransitionGroup component="ul" className={styles.ul}>
      {contacts.map(elem => (
        <CSSTransition
          key={elem.id}
          timeout={250}
          unmountOnExit
          classNames={styles}
        >
          <ContactsItem
            key={elem.id}
            contact={elem}
            onRemoveContact={onRemoveContact}
          ></ContactsItem>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactsList;

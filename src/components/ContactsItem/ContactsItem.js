import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsItem.module.css';

function ContactsItem({ contact: { name, number, id }, onRemoveContact }) {
  return (
    <li className={styles.contactsList}>
      <span>{name}</span>
      <span className={styles.contactsNumber}>{number}</span>
      <button
        className={styles.btn}
        type="button"
        onClick={() => {
          onRemoveContact(id);
        }}
      >
        delete
      </button>
    </li>
  );
}

ContactsItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onRemoveContact: PropTypes.func.isRequired,
};
export default ContactsItem;

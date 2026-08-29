import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";

function ContactsList({
  contacts,
  initiateDelete,
  editHandler,
  toggleSelection,
  selectedIds,
}) {
  return (
    <div className={styles.container}>
      <h3>Contacts List</h3>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              initiateDelete={initiateDelete}
              editHandler={editHandler}
              toggleSelection={toggleSelection}
              isSelected={selectedIds.includes(contact.id)}
            />
          ))}
        </ul>
      ) : (
        <p> The list is empty!</p>
      )}
    </div>
  );
}
export default ContactsList;

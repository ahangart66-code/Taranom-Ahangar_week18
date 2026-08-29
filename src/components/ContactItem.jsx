import styles from "./ContactItem.module.css";

function ContactItem({
  data,
  initiateDelete,
  editHandler,
  toggleSelection,
  isSelected,
}) {
  const { id, name, lastName, email, phone } = data;

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelection(id)}
      />

      <div className={styles.info}>
        <p>
          {name} {lastName}
        </p>
        <p>
          <span>📩</span> {email}
        </p>
        <p>
          <span>📞</span> {phone}
        </p>
      </div>

      <div className={styles.actions}>
        <button onClick={() => editHandler(data)}>✏️</button>
        <button onClick={() => initiateDelete(id)}>❌</button>
      </div>
    </li>
  );
}

export default ContactItem;

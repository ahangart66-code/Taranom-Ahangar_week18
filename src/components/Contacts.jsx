import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";
import Modal from "./Modal";
import styles from "./Contacts.module.css";

import { useContacts } from "../context/ContactsContext";
import { contactSchema } from "../validation/contactSchema";

function Contacts() {
  const { state, dispatch } = useContacts();
  const { contacts, selectedIds } = state;

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const submitHandler = (data) => {
    if (isEditing) {
      dispatch({
        type: "UPDATE_CONTACT",
        payload: data,
      });

      setIsEditing(false);
    } else {
      dispatch({
        type: "ADD_CONTACT",
        payload: data,
      });
    }

    reset();
  };

  const editHandler = (person) => {
    reset(person);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSelection = (id) => {
    dispatch({
      type: "TOGGLE_SELECTION",
      payload: id,
    });
  };

  const initiateDelete = (id = null) => {
    setDeleteTarget(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      dispatch({
        type: "DELETE_CONTACT",
        payload: deleteTarget,
      });
    } else {
      dispatch({
        type: "DELETE_SELECTED",
      });
    }

    setModalOpen(false);
    setDeleteTarget(null);
  };

const filteredContacts = contacts.filter((c) => {
  const searchLower = searchTerm.toLowerCase();

  return (
    c.name.toLowerCase().includes(searchLower) ||
    c.lastName.toLowerCase().includes(searchLower) ||
    c.email.toLowerCase().includes(searchLower) ||
    c.phone.includes(searchTerm)
  );
});

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(submitHandler)}
      >
        {inputs.map((input) => (
          <div
            key={input.name}
            className={styles.inputGroup}
          >
            <input
              {...input}
              {...register(input.name)}
              className={
                errors[input.name]
                  ? styles.inputError
                  : ""
              }
            />

            {errors[input.name] && (
              <span className={styles.errorMessage}>
                {errors[input.name].message}
              </span>
            )}
          </div>
        ))}

        <button
          type="submit"
          className={
            isEditing
              ? styles.btnUpdate
              : styles.btnAdd
          }
        >
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={styles.btnCancel}
          >
            Cancel
          </button>
        )}
      </form>

<div className={styles.searchContainer}>
  <input
    type="text"
    placeholder="Search by Name, Last Name, Email or Phone..."
    value={searchTerm}
    onChange={handleSearchChange}
    className={styles.searchInput}
  />
</div>

      {selectedIds.length > 0 && (
        <button
          onClick={() => initiateDelete()}
          className={styles.deleteBatchBtn}
        >
          🗑️ Delete Selected ({selectedIds.length})
        </button>
      )}

      <ContactsList
        contacts={filteredContacts}
        initiateDelete={initiateDelete}
        editHandler={editHandler}
        toggleSelection={toggleSelection}
        selectedIds={selectedIds}
      />

      {modalOpen && (
        <Modal
          onConfirm={confirmDelete}
          onCancel={() => {
            setModalOpen(false);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}

export default Contacts;


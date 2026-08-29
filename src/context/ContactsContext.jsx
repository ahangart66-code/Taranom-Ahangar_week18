import { createContext, useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const ContactsContext = createContext();

const initialState = {
  contacts: [],
  selectedIds: [],
};

const contactsReducer = (state, action) => {
  console.log("Action dispatched:", action);
  console.log("Current state:", state);
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload, id: uuidv4() }],
      };
case "DELETE_CONTACT":
  return {
    ...state,
    contacts: state.contacts.filter((c) => c.id !== action.payload),
    selectedIds: state.selectedIds.filter((id) => id !== action.payload),
  };
    case "DELETE_SELECTED":
      return {
        ...state,
        contacts: state.contacts.filter(
          (c) => !state.selectedIds.includes(c.id),
        ),
        selectedIds: [],
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
    case "TOGGLE_SELECTION":
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter((id) => id !== action.payload)
          : [...state.selectedIds, action.payload],
      };
    default:
      return state;
  }
};

export function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, initialState);
  return (
    <ContactsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
}

export const useContacts = () => useContext(ContactsContext);

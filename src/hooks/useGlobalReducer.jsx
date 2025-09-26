import React, { createContext, useReducer, useContext } from "react";

export const initialStore = {
  contacts: [],
  todos: [] 
};

function storeReducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
      };
    case "DELETE_CONTACT":
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload) };
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    default:
      return state;
  }
}

export const Context = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  const actions = {
    getContacts: async () => {
      try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/axelluribe/contacts");
        const data = await resp.json();
        dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
      } catch (err) {
        console.error("Error al obtener contactos:", err);
      }
    },

    addContact: async contact => {
      try {
        const resp = await fetch(
          "https://playground.4geeks.com/contact/agendas/axelluribe/contacts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...contact, agenda_slug: "axelluribe" }),
          }
        );
        if (!resp.ok) throw new Error("Error al crear contacto");
        const newContact = await resp.json();
        dispatch({ type: "ADD_CONTACT", payload: newContact });
      } catch (err) {
        console.error(err);
      }
    },

    updateContact: async (id, contact) => {
      try {
        const resp = await fetch(
          `https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...contact, agenda_slug: "axelluribe" }),
          }
        );
        if (!resp.ok) throw new Error("Error al actualizar contacto");
        const updatedContact = await resp.json();
        dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
      } catch (err) {
        console.error(err);
      }
    },

    deleteContact: async id => {
      try {
        const resp = await fetch(
          `https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${id}`,
          { method: "DELETE" }
        );
        if (!resp.ok) throw new Error("Error al eliminar contacto");
        dispatch({ type: "DELETE_CONTACT", payload: id });
      } catch (err) {
        console.error(err);
      }
    },
  };

  return (
    <Context.Provider value={{ store, actions, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);

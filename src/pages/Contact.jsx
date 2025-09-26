import React, { useEffect } from "react";
import { useStore } from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Contact = () => {
  const { store, actions } = useStore();

  useEffect(() => {
    actions.getContacts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Lista de Contactos</h2>
        <Link to="/add" className="btn btn-primary">➕ Nuevo Contacto</Link>
      </div>
      {store.contacts.length > 0 ? (
        store.contacts.map((contact, index) => (
          <ContactCard key={contact.id || index} contact={contact} />
        ))
      ) : (
        <p>No hay contactos</p>
      )}
    </div>
  );
};

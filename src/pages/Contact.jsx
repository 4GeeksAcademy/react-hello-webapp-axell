import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  const getContacts = async () => {
    try {
      const resp = await fetch(
        "https://playground.4geeks.com/contact/agendas/axelluribe/contacts"
      );
      const data = await resp.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
    } catch (err) {
      console.error("Error al obtener contactos:", err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Lista de Contactos</h2>
        <Link to="/add" className="btn btn-primary">
          ➕ Nuevo Contacto
        </Link>
      </div>

      {(store.contacts || []).length > 0 ? (
        store.contacts.map((contact, index) => (
          <ContactCard key={contact.id || index} contact={contact} />
        ))
      ) : (
        <p>No hay contactos</p>
      )}
    </div>
  );
};

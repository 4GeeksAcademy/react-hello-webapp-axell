import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  
 const createAgenda = async () => {
  try {
    const resp = await fetch(
      "https://playground.4geeks.com/contact/agendas/axelluribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      }
    );

    if (resp.status === 201) {
      console.log("Agenda creada correctamente");
    } else if (resp.status === 400) {
      console.log("La agenda ya existe ");
    } else {
      console.error("Error al crear agenda:", resp.status);
    }
  } catch (err) {
    console.error("Error en createAgenda:", err);
  }
};
  
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
    const init = async () => {
      await createAgenda(); 
      await getContacts();  
    };
    init();
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

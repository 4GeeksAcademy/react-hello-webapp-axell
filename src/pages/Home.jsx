import { useState, useEffect } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", address: "" });

  const getContacts = async () => {
    try {
      const resp = await fetch("https://playground.4geeks.com/contact/agendas/axelluribe/contacts");
      const data = await resp.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
    } catch (err) {
      console.error(err);
    }
  };

  const addContact = async contact => {
    if (!contact.name || !contact.email || !contact.phone || !contact.address) {
      return alert("Todos los campos son obligatorios");
    }
    try {
      const resp = await fetch("https://playground.4geeks.com/contact/agendas/axelluribe/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: "axelluribe" }),
      });
      const data = await resp.json();
      dispatch({ type: "ADD_CONTACT", payload: data.contacts ? data.contacts[0] : data }); // API devuelve contactos dentro de data.contacts
      setNewContact({ name: "", email: "", phone: "", address: "" });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { getContacts(); }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Lista de Contactos</h2>
        <Link to="/add" className="btn btn-primary">➕ Nuevo Contacto</Link>
      </div>

      <div className="mb-3">
        <input type="text" placeholder="Nombre" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} />
        <input type="email" placeholder="Email" value={newContact.email} onChange={e => setNewContact({ ...newContact, email: e.target.value })} />
        <input type="text" placeholder="Teléfono" value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} />
        <input type="text" placeholder="Dirección" value={newContact.address} onChange={e => setNewContact({ ...newContact, address: e.target.value })} />
        <button className="btn btn-success ms-2" onClick={() => addContact(newContact)}>Añadir Contacto</button>
      </div>

      {(store.contacts || []).length > 0
        ? store.contacts.map(contact => <ContactCard key={contact.id} contact={contact} />)
        : <p>No hay contactos</p>
      }
    </div>
  );
};

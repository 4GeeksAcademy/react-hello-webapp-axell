import React, { useState, useEffect } from "react";
import { useStore } from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
  const { store, dispatch } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const existingContact = store.contacts.find(c => String(c.id) === id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (existingContact) setForm(existingContact);
  }, [existingContact]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.phone || !form.address) {
      return alert("Todos los campos son obligatorios");
    }

    try {
      if (id) {
        const resp = await fetch(`https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, agenda_slug: "axelluribe" }),
        });
        const updatedContact = await resp.json();
        dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
      } else {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/axelluribe/contacts', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, agenda_slug: "axelluribe" }),
        });
        const newContact = await resp.json();
        dispatch({ type: "ADD_CONTACT", payload: newContact });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al guardar contacto");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="full_name" placeholder="Nombre completo" className="form-control mb-2" value={form.full_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Teléfono" className="form-control mb-2" value={form.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Dirección" className="form-control mb-2" value={form.address} onChange={handleChange} required />
        <button type="submit" className="btn btn-success">Guardar</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancelar</button>
      </form>
    </div>
  );
};

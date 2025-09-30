import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  
  const [newContact, setNewContact] = useState({ full_name: "", email: "", phone: "", address: "" });
  const [todoColor, setTodoColor] = useState("yellow");

 
  const getContacts = async () => {
    try {
      const resp = await fetch(
        "https://playground.4geeks.com/contact/agendas/axelluribe/contacts"
      );
      const data = await resp.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
    } catch (err) {
      console.error(err);
    }
  };

  const addContact = async contact => {
    try {
      const resp = await fetch(
        "https://playground.4geeks.com/contact/agendas/axelluribe/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...contact, agenda_slug: "axelluribe" }),
        }
      );
      const newC = await resp.json();
      dispatch({ type: "ADD_CONTACT", payload: newC });
      setNewContact({ full_name: "", email: "", phone: "", address: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const resp = await fetch(
        `https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...contact, agenda_slug: "axelluribe" }),
        }
      );
      const updated = await resp.json();
      dispatch({ type: "UPDATE_CONTACT", payload: updated });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async id => {
    try {
      await fetch(
        `https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${id}`,
        { method: "DELETE" }
      );
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (err) {
      console.error(err);
    }
  };

  
  useEffect(() => {
    getContacts();
  }, []);

  
  const highlightTodo = (id, color) => {
    dispatch({ type: "add_task", payload: { id, color } });
  };

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo" />
      </p>

     
      <h2>Contactos</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre"
          value={newContact.full_name}
          onChange={e => setNewContact({ ...newContact, full_name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={e => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={newContact.phone}
          onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={newContact.address}
          onChange={e => setNewContact({ ...newContact, address: e.target.value })}
        />
        <button className="btn btn-success ms-2" onClick={() => addContact(newContact)}>
          Añadir Contacto
        </button>
      </div>

      <ul className="list-group mb-5">
        {store.contacts.map(contact => (
          <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
            {contact.full_name} - {contact.email}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => updateContact(contact.id, { ...contact, full_name: contact.full_name + " ✔" })}
              >
                Actualizar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteContact(contact.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

     
      <h2>Tareas</h2>
      <ul className="list-group">
        {store.todos.map(todo => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ background: todo.background || "transparent" }}
          >
            {todo.title}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => highlightTodo(todo.id, todoColor)}
            >
              Resaltar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
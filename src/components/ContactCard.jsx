import React, { useState } from "react";
import { useStore } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useStore();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${contact.id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_CONTACT", payload: contact.id });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-3 mb-2 d-flex flex-row justify-content-between align-items-center">
      <div>
        <h5>{contact.full_name}</h5>
        <p>{contact.email} | {contact.phone}</p>
        <p>{contact.address}</p>
      </div>
      <div>
        <Link to={`/edit/${contact.id}`} className="btn btn-warning me-2">Editar</Link>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>Eliminar</button>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar a {contact.full_name}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

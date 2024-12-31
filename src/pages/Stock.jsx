import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';

function Stock() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // for stock items
  const [stockItems, setStockItems] = useState([
    { id: 1, name: "Produit A", quantity: 10 },
    { id: 2, name: "Produit B", quantity: 5 },
    { id: 3, name: "Produit C", quantity: 8 },
  ]);

  const handleCloseConfirm = () => setShowConfirm(false);

  // Supprimer un produit
  const handleDeleteProduct = () => {
    setStockItems(stockItems.filter(item => item.id !== currentItem.id));
    handleCloseConfirm();
  };

  // Afficher la modale de confirmation de suppression
  const handleShowConfirm = (item) => {
    setCurrentItem(item);
    setShowConfirm(true);
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        {/* Sidebar placeholder */}
        <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
          {/* Sidebar (to be implemented) */}
        </div>

        {/* Espace principal */}
        <div className="col-12 col-md-10 offset-md-2">
          <h1 className="mt-4 mb-4">
            <FaCalendarAlt style={{ color: '#896432' }} /> Gestion de Stock
          </h1>

          <div className="table-responsive shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stockItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td style={{ textAlign: "center" }}>
                      {/* Bouton supprimer */}
                      <button 
                        onClick={() => handleShowConfirm(item)} 
                        className="delete" 
                        title="Supprimer" 
                        style={{ color: "red", backgroundColor: "transparent", border: "none", fontWeight: "bold", fontSize: "24px" }}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal pour la Confirmation de Suppression */}
          <Modal show={showConfirm} onHide={handleCloseConfirm}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Êtes-vous sûr de vouloir supprimer ce produit ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirm}>Annuler</Button>
              <Button variant="danger" onClick={handleDeleteProduct}>Supprimer</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Stock;

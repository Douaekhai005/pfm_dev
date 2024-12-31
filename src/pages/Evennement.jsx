import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { MdPersonAdd, MdDelete, MdEdit } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import Sidebar from '../login/Sidbar';
import Navba from '../login/Navba';
import Navplanification from '../navbar/Navplanification';

function Evennement() {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    date: '',
    evenement: '',
    plasse: '',
    detaile: ''
  });
  const [editEvent, setEditEvent] = useState({
    id: '',
    date: '',
    evenement: '',
    plasse: '',
    detaile: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/events')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);
  const handleConfirmClose = () => setShowConfirm(false);
  const handleConfirmShow = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (event) => {
    setEditEvent(event);
    setShowEdit(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({ ...editEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/events', newEvent)
      .then(res => {
        setData([...data, res.data]);
        handleAddClose();
        setNewEvent({
          date: '',
          evenement: '',
          plasse: '',
          detaile: ''
        });
      })
      .catch(err => console.error(err));
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/events/${editEvent.id}`, editEvent)
      .then(res => {
        const updatedData = data.map(event => event.id === editEvent.id ? res.data : event);
        setData(updatedData);
        handleEditClose();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/events/${deleteId}`)
      .then(() => {
        const updatedData = data.filter(event => event.id !== deleteId);
        setData(updatedData);
        handleConfirmClose();
      })
      .catch(err => console.error(err));
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const term = e.target.value.toLowerCase();
    const filtered = data.filter(m => m.evenement.toLowerCase().includes(term) );
    setData(filtered);
  };

  return (
    <div className='container-fluid min-vh-100'>
      <div className='row'>
        <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
          <Sidebar />
        </div>
        <div className='col-4 col-md-2'></div>
        <div className='col mt-0 mr-0 md-5'>
          <Navba />
          <div className='col m-5'>
            <div className="container">
              <div className='mb-5'> <Navplanification /> </div>
              <div>
                <h1 style={{ color: "#896432" }}>
                  <FaUserFriends style={{ color: '#896432' }} /> Liste des evennements
                </h1>
              </div>
              <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
                  <div className="col-sm-3 mt-5 mb-4 text-gred">
                    <div className="search">
                      <form className="form-inline">
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          placeholder="Search Employé"
                          aria-label="Search"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "#1CA4AC" }}>
                  </div>
                  <div className="col-sm-4 mt-5 mb-4 text-gred text-right d-flex justify-content-end">
                    <Button variant="primary" style={{ backgroundColor: "#896432", border: "none" }} onClick={handleAddShow}>
                      <MdPersonAdd style={{ fontSize: "24px", marginRight: "5px" }} /> Ajouter Evennement
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Evenement</th>
                          <th>Le lieu</th>
                          <th>Détaille</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((e, i) => (
                          <tr key={i}>
                            <td>{e.date}</td>
                            <td>{e.evenement}</td>
                            <td>{e.plasse}</td>
                            <td>{e.detaile}</td>
                            <td style={{ textAlign: "center" }}>
                              <button onClick={() => handleEditShow(e)} className="edit" title="Edit" data-toggle="tooltip" style={{ backgroundColor: "transparent", border: "none", fontWeight: "bold", fontSize: "24px" }}>
                                <MdEdit />
                              </button>
                              <button onClick={() => handleConfirmShow(e.id)} className="delete" title="Delete" data-toggle="tooltip" style={{ color: "red", backgroundColor: "transparent", border: "none", fontWeight: "bold", fontSize: "24px" }}>
                                <MdDelete />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="model_box">
                  {/* Modal pour l'ajout */}
                  <Modal
                    show={showAdd}
                    onHide={handleAddClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Ajouter Evennement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleAddEvent}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontWeight: 'bold' }}>Date</label>
                          <input
                            type="date"
                            className="form-control mt-2"
                            placeholder="Enter la date de l'event"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                          />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Evenement</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter l'evennement"
                            name="evenement"
                            value={newEvent.evenement}
                            onChange={handleInputChange}
                          />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Le lieu</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter le lieu"
                            name="plasse"
                            value={newEvent.plasse}
                            onChange={handleInputChange}
                          />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Détails</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter les détails"
                            name="detaile"
                            value={newEvent.detaile}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button type="submit" style={{ backgroundColor: "#896432", border: "none" }} className="btn mt-4">Ajouter</button>
                      </form>
                    </Modal.Body>
                  </Modal>

                  {/* Modal de confirmation de la suppression */}
                  <Modal show={showConfirm} onHide={handleConfirmClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Êtes-vous sûr de vouloir supprimer cet évènement ?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleConfirmClose}>
                        Annuler
                      </Button>
                      <Button variant="danger" onClick={handleDelete}>
                        Supprimer
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Modal pour l'édition */}
                  <Modal
                    show={showEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Modifier Evennement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleEditEvent}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontWeight: 'bold' }}>Date</label>
                          <input
                            type="date"
                            className="form-control mt-2"
                            placeholder="Enter la date de l'event"
                            name="date"
                            value={editEvent.date}
                            onChange={handleEditInputChange}
                          />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Evenement</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter l'evennement"
                            name="evenement"
                            value={editEvent.evenement}
                            onChange={handleEditInputChange}
                          />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Le lieu</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter le lieu"
                            name="plasse"
                            value={editEvent.plasse}
                            onChange={handleEditInputChange}
                          />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Détails</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter les détails"
                            name="detaile"
                            value={editEvent.detaile}
                            onChange={handleEditInputChange}
                          />
                        </div>
                        <button type="submit" style={{ backgroundColor: "#896432", border: "none" }} className="btn mt-4">Modifier</button>
                      </form>
                    </Modal.Body>
                  </Modal>
                </div>
                {/* Autres modals (modification, suppression) peuvent être ajoutés ici */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evennement;

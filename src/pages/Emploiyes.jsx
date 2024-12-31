import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { MdPersonAdd, MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import Navba from '../login/Navba';
import Sidebar from '../login/Sidbar';

function Emploiyes() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState({
    id: '', cin: '', nom: '', prenom: '', post: '', tel: '', date_integration: ''
  });
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    cin: '', nom: '', prenom: '', post: '', tel: '', date_integration: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (employee) => {
    setEditData(employee);
    setShowEdit(true);
  };
  const handleConfirmClose = () => setShowConfirm(false);
  const handleConfirmShow = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/employees')
      .then(res => {
        setData(res.data);
        console.log(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/employees', inputData)
      .then(res => {
        const newItem = res.data;
        setData([...data, newItem]);
        setInputData({ cin: '', nom: '', prenom: '', post: '', tel: '', date_integration: '' });
        handleClose();
        navigate('/employes');
      })
      .catch(err => console.error(err));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/employees/${editData.id}`, editData)
      .then(res => {
        const updatedData = data.map(item => item.id === editData.id ? res.data : item);
        setData(updatedData);
        handleEditClose();
      })
      .catch(err => console.error(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const term = e.target.value.toLowerCase();
    const filtered = data.filter(m => m.cin.toLowerCase().includes(term) || m.nom.toLowerCase().includes(term));
    setData(filtered);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/employees/${deleteId}`)
      .then(res => {
        setData(data.filter(item => item.id !== deleteId));
        handleConfirmClose();
      })
      .catch(err => console.error(err));
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
              <div>
                <h1 style={{ color: "#896432" }}>
                  <FaUserFriends style={{ color: '#896432' }} /> Liste employes
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
                    {/* Vous pouvez ajouter un titre ici si nécessaire */}
                  </div>
                  <div className="col-sm-4 mt-5 mb-4 text-gred text-right d-flex justify-content-end">
                    <Button variant="primary" style={{ backgroundColor: "#896432", border: "none" }} onClick={handleShow}>
                      <MdPersonAdd style={{ fontSize: "24px", marginRight: "5px" }} /> Ajouter Employé
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>CIN</th>
                          <th>Nom et prenom</th>
                          <th>Post occupé</th>
                          <th>Date d'integration</th>
                          <th>Telephone</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((e, i) => (
                          <tr key={i}>
                            <td>{e.cin}</td>
                            <td>{e.nom} {e.prenom}</td>
                            <td>{e.post}</td>
                            <td>{e.date_integration}</td>
                            <td>{e.tel}</td>
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
                  {/* modelle pour l'ajout */}
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                  >
                    <Modal.Header closeButton>
                      <Modal.Title  style={{ color: "#896432" }}>Ajouter Employé</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontWeight: 'bold' }}>CIN</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter CIN" value={inputData.cin} onChange={e => setInputData({ ...inputData, cin: e.target.value })} />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Nom</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter nom" value={inputData.nom} onChange={e => setInputData({ ...inputData, nom: e.target.value })} />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Prenom</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter prenom" value={inputData.prenom} onChange={e => setInputData({ ...inputData, prenom: e.target.value })} />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Post occupé</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter le post" value={inputData.post} onChange={e => setInputData({ ...inputData, post: e.target.value })} />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Date d'intégration</label>
                          <input type="date" className="form-control mt-2" placeholder="Enter la date d'intégration" value={inputData.date_integration} onChange={e => setInputData({ ...inputData, date_integration: e.target.value })} />
                          <label className="form-label mt-3" style={{ fontWeight: 'bold' }}>Numéro de téléphone</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter le téléphone" value={inputData.tel} onChange={e => setInputData({ ...inputData, tel: e.target.value })} />
                        </div>
                        <button type="submit" style={{ color:"white", backgroundColor: "#896432", border: "none" }} className="btn mt-4">Ajouter</button>
                      </form>
                    </Modal.Body>
                  </Modal>
                  {/* modelle pour la modification */}
                  <Modal
                    show={showEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                  >
                    <Modal.Header closeButton>
                      <Modal.Title style={{ color: "#896432" }}>Modifier Employé</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontWeight: 'bold' }}>CIN</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter CIN" value={editData.cin} onChange={e => setEditData({ ...editData, cin: e.target.value })} />
                          <label className="form-label" style={{ fontWeight: 'bold' }}>Nom</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter nom" value={editData.nom} onChange={e => setEditData({ ...editData, nom: e.target.value })} />
                          <label className="form-label" style={{ fontWeight: 'bold' }}>Prenom</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter prenom" value={editData.prenom} onChange={e => setEditData({ ...editData, prenom: e.target.value })} />
                          <label className="form-label" style={{ fontWeight: 'bold' }}>Post occupé</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter le post" value={editData.post} onChange={e => setEditData({ ...editData, post: e.target.value })} />
                          <label className="form-label" style={{ fontWeight: 'bold' }}>Date d'intégration</label>
                          <input type="date" className="form-control mt-2" placeholder="Enter la date d'intégration" value={editData.date_integration} onChange={e => setEditData({ ...editData, date_integration: e.target.value })} />
                          <label className="form-label" style={{ fontWeight: 'bold' }}>Numéro de téléphone</label>
                          <input type="text" className="form-control mt-2" placeholder="Enter le téléphone" value={editData.tel} onChange={e => setEditData({ ...editData, tel: e.target.value })} />
                        </div>
                        <button type="submit" style={{ backgroundColor: "#896432", border: "none" ,color:"white"}} className="btn mt-4">Modifier</button>
                      </form>
                    </Modal.Body>
                  </Modal>
                </div>
                {/* modele de confirmation de la supprission   */}
                <Modal show={showConfirm} onHide={handleConfirmClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cet employé ?
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emploiyes;

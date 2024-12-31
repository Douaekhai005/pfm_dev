import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { MdPersonAdd, MdDelete, MdEdit } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import Sidebar from '../login/Sidbar';
import Navba from '../login/Navba';
import Navplanification from '../navbar/Navplanification';

function Planification() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [emploitemp, setEmploitemp] = useState([]);
  const [filteredEmploitemp, setFilteredEmploitemp] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [jour, setJour] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [currentPlanification, setCurrentPlanification] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/employees')
      .then(res => {
        setEmployees(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));

    axios.get('http://localhost:3001/emploitemp')
      .then(res => {
        setEmploitemp(res.data);
        setFilteredEmploitemp(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAddPlanification = (e) => {
    e.preventDefault();
    const newPlanification = {
      cin: selectedEmployee,
      jour,
      heured: heureDebut,
      heuref: heureFin
    };
    axios.post('http://localhost:3001/emploitemp', newPlanification)
      .then(res => {
        setEmploitemp([...emploitemp, res.data]);
        setFilteredEmploitemp([...emploitemp, res.data]);
        handleCloseAdd();
      })
      .catch(err => console.error(err));
  };

  const handleEditPlanification = (e) => {
    e.preventDefault();
    const updatedPlanification = {
      cin: selectedEmployee,
      jour,
      heured: heureDebut,
      heuref: heureFin
    };
    axios.put(`http://localhost:3001/emploitemp/${currentPlanification.id}`, updatedPlanification)
      .then(res => {
        const updatedEmploitemp = emploitemp.map(item => item.id === currentPlanification.id ? res.data : item);
        setEmploitemp(updatedEmploitemp);
        setFilteredEmploitemp(updatedEmploitemp);
        handleCloseEdit();
      })
      .catch(err => console.error(err));
  };

  const handleEditShow = (planification) => {
    setCurrentPlanification(planification);
    setSelectedEmployee(planification.cin);
    setJour(planification.jour);
    setHeureDebut(planification.heured);
    setHeureFin(planification.heuref);
    setShowEdit(true);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/emploitemp/${deleteId}`)
      .then(res => {
        const updatedEmploitemp = emploitemp.filter(item => item.id !== deleteId);
        setEmploitemp(updatedEmploitemp);
        setFilteredEmploitemp(updatedEmploitemp);
        handleCloseConfirm();
      })
      .catch(err => console.error(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const term = e.target.value.toLowerCase();
    const filtered = emploitemp.filter(plan => {
      const employee = employees.find(emp => emp.cin === plan.cin);
      const fullName = `${employee?.nom.toLowerCase()} ${employee?.prenom.toLowerCase()}`;
      return fullName.includes(term);
    });
    setFilteredEmploitemp(filtered);
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
              <h1 style={{ color: "#896432" }}>
                <FaCalendarAlt style={{ color: '#896432' }} /> La planification des employés
              </h1>
              <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
                  <div className="col-sm-3 mt-5 mb-4 text-gred">
                    <div className="search">
                      <form className="form-inline">
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          placeholder="Rechercher un employé"
                          aria-label="Recherche"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "#1CA4AC" }}></div>
                  <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
                    <Button variant="primary" style={{ backgroundColor: "#896432", border: "none" }} onClick={handleShowAdd}>
                      <MdPersonAdd style={{ fontSize: "24px", marginRight: "5px" }} /> Ajouter une planification
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>Employé</th>
                          <th>Jour</th>
                          <th>Heure début</th>
                          <th>Heure fin</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmploitemp.map((p, i) => (
                          <tr key={i}>
                            <td>{employees.find(emp => emp.cin === p.cin)?.nom} {employees.find(emp => emp.cin === p.cin)?.prenom}</td>
                            <td>{p.jour}</td>
                            <td>{p.heured}</td>
                            <td>{p.heuref}</td>
                            <td style={{ textAlign: "center" }}>
                              <button className="edit" title="Modifier" data-toggle="tooltip" style={{ backgroundColor: "transparent", border: "none", fontWeight: "bold", fontSize: "24px" }} onClick={() => handleEditShow(p)}>
                                <MdEdit />
                              </button>
                              <button onClick={() => handleShowConfirm(p.id)} className="delete" title="Supprimer" data-toggle="tooltip" style={{ color: "red", backgroundColor: "transparent", border: "none", fontWeight: "bold", fontSize: "24px" }}>
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
                  {/* Modal for Adding */}
                  <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false} size='lg'>
                    <Modal.Header closeButton>
                      <Modal.Title>Ajouter une planification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleAddPlanification}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontWeight: "bold" }}>Employé</label>
                          <select 
                            className="form-control mt-2"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                          >
                            <option value="">Sélectionner un employé</option>
                            {employees.map((emp) => (
                              <option key={emp.cin} value={emp.cin}>{emp.nom} {emp.prenom}</option>
                            ))}
                          </select>
                          <label className="form-label" style={{ fontWeight: "bold" }}>Le jour</label>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            placeholder="Enter le jour" 
                            value={jour}
                            onChange={(e) => setJour(e.target.value)}
                          />
                          <label className="form-label" style={{ fontWeight: "bold" }}>Heure début</label>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            placeholder="Enter Heure début"  
                            value={heureDebut}
                            onChange={(e) => setHeureDebut(e.target.value)}
                          />
                          <label className="form-label" style={{ fontWeight: "bold" }}>Heure fin</label>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            placeholder="Enter Heure fin"  
                            value={heureFin}
                            onChange={(e) => setHeureFin(e.target.value)}
                          />
                        </div>
                        <button type="submit" style={{ backgroundColor: "#896432", border: "none" }} className="btn mt-4">Ajouter</button>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseAdd}>Fermer</Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Modal for Editing */}
                  <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false} size='lg'>
                    <Modal.Header closeButton>
                      <Modal.Title>Modifier la planification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleEditPlanification}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontWeight: "bold" }}>Employé</label>
                          <select 
                            className="form-control mt-2"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                          >
                            <option value="">Sélectionner un employé</option>
                            {employees.map((emp) => (
                              <option key={emp.cin} value={emp.cin}>{emp.nom} {emp.prenom}</option>
                            ))}
                          </select>
                          <label className="form-label" style={{ fontWeight: "bold" }}>Le jour</label>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            placeholder="Enter le jour" 
                            value={jour}
                            onChange={(e) => setJour(e.target.value)}
                          />
                          <label className="form-label" style={{ fontWeight: "bold" }}>Heure début</label>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            placeholder="Enter Heure début"  
                            value={heureDebut}
                            onChange={(e) => setHeureDebut(e.target.value)}
                          />
                          <label className="form-label" style={{ fontWeight: "bold" }}>Heure fin</label>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            placeholder="Enter Heure fin"  
                            value={heureFin}
                            onChange={(e) => setHeureFin(e.target.value)}
                          />
                        </div>
                        <button type="submit" style={{ backgroundColor: "#896432", border: "none" }} className="btn mt-4">Modifier</button>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseEdit}>Fermer</Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Modal for Delete Confirmation */}
                  <Modal show={showConfirm} onHide={handleCloseConfirm}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Êtes-vous sûr de vouloir supprimer cette emploi ?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseConfirm}>Annuler</Button>
                      <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planification;

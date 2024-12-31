import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';
import Sidebar from '../login/Sidbar';
import Navba from '../login/Navba';
import {users} from '../login/db'

function Emploi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [emploitemp, setEmploitemp] = useState([]);
  const [filteredEmploitemp, setFilteredEmploitemp] = useState([]);

  useEffect(() => {
   
    const database = users
      setEmployees(database.employees)
      setEmploitemp(database.emploitemp)
      console.log("emploitemp", emploitemp)
      setFilteredEmploitemp(database.emploitemp)

  }, []);

  const handleSearch = (e) => {

    setSearchTerm(e.target.value);
    const term = e.target.value.toLowerCase();
    const filtered = emploitemp.filter(plan => {
      const employee = employees.find(emp => emp.cin === plan.cin);
      if (!employee) return false;
      const fullName = `${employee.nom.toLowerCase()} ${employee.prenom.toLowerCase()}`;
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
              <h1 style={{ color: "#896432" }}>
            <FaCalendarAlt style={{ color: '#896432' }} /> Emploi du temps
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
                  <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred"></div>
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
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmploitemp.map((p, i) => (
                          <tr key={i}>
                            <td>
                              {employees.map(emp => {
                                if (p.cin === emp.cin)
                                  return `${emp.nom} ${emp.prenom}`;
                                return null;
                              })}
                            </td>
                            <td>{p.jour}</td>
                            <td>{p.heured}</td>
                            <td>{p.heuref}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emploi;

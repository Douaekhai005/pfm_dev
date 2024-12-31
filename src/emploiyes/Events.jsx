import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaUserFriends } from 'react-icons/fa';
import Sidebar from '../login/Sidbar';
import Navba from '../login/Navba';
import {users} from '../login/db'


function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // le contenu dans useEffect execute lors de chargement de la page(car[])
  useEffect(() => {
    const eventsFronDB = users.events
    setEvents(eventsFronDB)
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const term = e.target.value.toLowerCase();
    const filtered = users.events.filter(m => m.evenement.toLowerCase().includes(term) );
    setEvents(filtered);
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
                         
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((e, i) => (
                          <tr key={i}>
                            <td>{e.date}</td>
                            <td>{e.evenement}</td>
                            <td>{e.plasse}</td>
                            <td>{e.detaile}</td>
                           
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

export default Events;

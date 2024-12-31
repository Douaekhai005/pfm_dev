import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaTicketAlt } from 'react-icons/fa';
import { BiCube } from 'react-icons/bi';
import Navba from '../login/Navba';
import './home.css';
import Sidebar from '../login/Sidbar';

function Home() {
  const [data, setData] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/employees')
      .then(res => {
        setData(res.data);
        setEmployeeCount(res.data.length);  // Mettez à jour le nombre d'employés
      })
      .catch(err => console.error(err));
  }, []);

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
              <div className="row">
                <div className="col">
                  <div className="card h-100 l-bg-blue-dark">
                    <div className="card-statistic-3 p-5 d-flex flex-column justify-content-between">
                      <div>
                        <div className="card-icon card-icon-large icon-large" style={{ fontSize: '140px' }}><FaUser /></div>
                        <div className="mb-4">
                          <h3 className="mb-0">Employés</h3><br />
                          <h4 className="my-1">{employeeCount} personne{employeeCount > 1 ? 's' : ''}</h4> {/* Affiche le nombre d'employés */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 l-bg-green-dark">
                    <div className="card-statistic-3 p-5 d-flex flex-column justify-content-between">
                      <div>
                        <div className="card-icon card-icon-large icon-large" style={{ fontSize: '140px' }}><FaTicketAlt /></div>
                        <div className="mb-4">
                          <h3 className="mb-0">Total ventes</h3><br />
                          <h4 className="my-1">$84,245</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 l-bg-blue-dark">
                    <div className="card-statistic-3 p-5 d-flex flex-column justify-content-between">
                      <div>
                        <div className="card-icon card-icon-large icon-large" style={{ fontSize: '140px' }}><BiCube /></div>
                        <div className="mb-4">
                          <h3 className="mb-0">Stock matière</h3><br />
                          <h4 className="my-1">100kg</h4>
                        </div>
                      </div>
                    </div>
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

export default Home;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navplanification() {
    const location = useLocation();

    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/planification' ? 'active' : ''}`} to="/planification">
            Emploi du temps
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/AddEvennement' ? 'active' : ''}`} to="/AddEvennement">
            Evennement
          </Link>
        </li>
      </ul>
    );
}

export default Navplanification;

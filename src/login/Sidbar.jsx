import React, { useEffect, useState } from 'react';
import { FaHome, FaUserFriends, FaCalendarAlt, FaChartBar, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    setCurrentUserRole(role);
  }, []);
  
  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return (
    <div>
      <section id="sidebar">
        <div className="logo">
          <img src="./images/logo.png" alt="Logo" style={{ width: '200px', height: 'auto', marginLeft: '20px' }} />
        </div>

        {currentUserRole === 'gerant' ? (
          <ul className="side-menu top">
            <li className={location.pathname === "/home" ? "active" : ""}>
              <Link to="/home">
                <FaHome style={{ color: '#896432' }} />
                <span className="text">Accueil</span>
              </Link>
            </li>
            <li className={location.pathname === "/employes" ? "active" : ""}>
              <Link to="/employes">
                <FaUserFriends style={{ color: '#896432' }} />
                <span className="text">Employés</span>
              </Link>
            </li>
            <li className={(location.pathname === "/planification" || location.pathname === "/Evennement" || location.pathname === "/AddEvennement") ? "active" : ""}>
              <Link to="/planification">
                <FaCalendarAlt style={{ color: '#896432' }} />
                <span className="text">Planification</span>
              </Link>
            </li>
            <li className={location.pathname === "/ventes" ? "active" : ""}>
              <Link to="/ventes">
                <FaChartBar style={{ color: '#896432' }} />
                <span className="text">Ventes</span>
              </Link>
            </li>
            <li className={location.pathname === "/stock" ? "active" : ""}>
              <Link to="/stock">
                <FaWarehouse style={{ color: '#896432' }} />
                <span className="text">Stock</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logout} className="logout">
                <FaSignOutAlt style={{ color: '#896432' }} />
                <span className="text">Déconnecter</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="side-menu top">
            <li className={location.pathname === "/emploi" ? "active" : ""}>
              <Link to="/emploi">
                <FaHome style={{ color: '#896432' }} />
                <span className="text">Emploi du temps</span>
              </Link>
            </li>
            <li className={location.pathname === "/demande" ? "active" : ""}>
              <Link to="/demande">
                <FaUserFriends style={{ color: '#896432' }} />
                <span className="text">Demande de congé</span>
              </Link>
            </li>
            <li className={location.pathname === "/Event" ? "active" : ""}>
              <Link to="/Event">
                <FaCalendarAlt style={{ color: '#896432' }} />
                <span className="text">Événements</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logout} className="logout">
                <FaSignOutAlt style={{ color: '#896432' }} />
                <span className="text">Déconnecter</span>
              </Link>
            </li>
          </ul>
        )}
      </section>
    </div>
  );
}

export default Sidebar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importez également Routes

import Home from './pages/Home';
import Ventes from './pages/Ventes';
import Stock from './pages/Stock';
import Planification from './pages/Planification';
import Emploiyes from './pages/Emploiyes';
import Sidebar from './login/Sidbar'; // Correction de l'import
import Nav from './login/Navb';

function App() {
  return (
    <Router>
      <div className='container-fluid min-vh-100'>
        <div className='row'>
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>

            <Sidebar/> {/* Déplacez Sidebar à l'intérieur de la colonne */}
            
          </div>
          <div className='col-4 col-md-2'></div>
          <div className='col mt-0 mr-0 md-5'> 
          <Nav/>
        <div className='col m-5'>
            <Routes> {/* Utilisez Routes ici */}
              <Route path="/" element={<Home />} /> {/* Utilisez 'element' pour spécifier le composant */}
              <Route path="/ventes" element={<Ventes />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/employes" element={<Emploiyes />} />
              <Route path="/planification" element={<Planification />} />
            </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

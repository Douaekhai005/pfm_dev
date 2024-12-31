import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Home from './Home';
import Emploiyes from './Emploiyes';
import Planification from './Planification';
import Stock from './Stock';
import Ventes from './Ventes';
import Emploi from '../emploiyes/Emploi';
import Demande from '../emploiyes/Demande';
import Events from '../emploiyes/Events';
import Login from '../login/Login';
import OnlyUserMiddleware from '../login/OnlyUserMiddleware';

import Evennement from './Evennement';

function Routage() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        <Route path="/home" element={
            <OnlyUserMiddleware usersAllowed={['gerant']}>
             
                <Home />
              
            </OnlyUserMiddleware>
          } /> 
          <Route path="/ventes" element={
            <OnlyUserMiddleware usersAllowed={['gerant']}>
            
                <Ventes />
             
            </OnlyUserMiddleware>
          } /> 
          <Route path="/stock" element={
            <OnlyUserMiddleware usersAllowed={['gerant']}>
            
                <Stock />
       
            </OnlyUserMiddleware>
          } />
          <Route path="/employes" element={
            <OnlyUserMiddleware usersAllowed={['gerant']}>
            
                <Emploiyes />
             
            </OnlyUserMiddleware>
          } />
       <Route path="/planification" element={
            <OnlyUserMiddleware usersAllowed={['gerant']}>
              
                <Planification />
           
            </OnlyUserMiddleware>
          } /> 
             <Route path="/AddEvennement" element={
            <OnlyUserMiddleware usersAllowed={['gerant']}>
              
                <Evennement />
           
            </OnlyUserMiddleware>
          } /> 
        
       

           <Route path="/emploi" element={
            <OnlyUserMiddleware usersAllowed={['emploiye']}>
              
                <Emploi />
            </OnlyUserMiddleware>
          } /> 
           <Route path="/demande" element={
            <OnlyUserMiddleware usersAllowed={['emploiye']}>
              
                <Demande />
              
            </OnlyUserMiddleware>
          } /> 
          <Route path="/Event" element={
            <OnlyUserMiddleware usersAllowed={['emploiye']}>
            
                <Events />
             
            </OnlyUserMiddleware>
          } /> 
        </Routes>
      </Router>
    </div>
  );
}

export default Routage;

import React from 'react';
import Sidebar from '../login/Sidbar';
import Navba from '../login/Navba';

function Ventes() {
  return (
    <div className='container-fluid min-vh-100'>
      <div className='row'>
        {/* Sidebar (Fixe à gauche) */}
        <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
          <Sidebar /> {/* Barre latérale */}
        </div>

        {/* Espace principal */}
        <div className='col-12 col-md-10 offset-md-2'>
          <Navba /> {/* Barre de navigation */}

          {/* Contenu principal */}
          <div className='container mt-5'>
            <h1>Gestion des ventes</h1>

            {/* Tableau des ventes */}
            <div className="table-responsive mt-4">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                    <th>Date</th>
                
                  </tr>
                </thead>
                <tbody>
                  {/* Exemple de ligne de vente */}
                  <tr>
                    <td>Produit A</td>
                    <td>5</td>
                    <td>50 €</td>
                    <td>12/12/2024</td>
                   
                  </tr>
                  {/* Vous pouvez ajouter ici d'autres lignes dynamiques */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ventes;

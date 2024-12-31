import React from 'react';
import Sidebar from './Sidbar';

function Layout({ children }) {
  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
          <Sidebar />
        </div>
        
        <div className="col-4 col-md-2"></div>
        <div className="col mt-0 mr-0 md-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;

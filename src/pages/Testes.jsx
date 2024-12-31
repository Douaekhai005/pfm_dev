return (
    <div className='container-fluid min-vh-100'>
    <div className='row'>
      <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>

        <Sidebar/> {/* Déplacez Sidebar à l'intérieur de la colonne */}
        
      </div>
      <div className='col-4 col-md-2'></div>
      <div className='col mt-0 mr-0 md-5'> 
      <Navba/>
    <div className='col m-5'>
       <Navplanification/>
        </div>
      </div>
    </div>
  </div>
  )
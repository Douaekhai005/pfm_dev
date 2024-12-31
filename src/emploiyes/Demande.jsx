import React , {useState} from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './demande.css';
import Sidebar from '../login/Sidbar';
import Navba from '../login/Navba';


function Demande() {

  const [demandeConges, setDemandeConges] = useState([])
  const [absenceTypeValue, setAbsenceTypeValue] = useState("")

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);

    const startDate = formData.get("startDate")
    const startPeriod = formData.get("startPeriod")
    const endDate = formData.get("endDate")
    const endPeriod = formData.get("endPeriod")
    const absenceType = formData.get("absenceType")

   

    if(!startDate || !startPeriod || !endDate || !endPeriod || !absenceType ){
      alert("some of the fields are not filled!")
      return
    }


    alert("la demande a ete ajoutee !")

    // ajouter la nouvelle demande de conge dans la list
    setDemandeConges([
      ...demandeConges,
      {
        startDate: startDate,
        startPeriod : startPeriod,
        endDate : endDate,
        endPeriod : endPeriod,
        absenceType :absenceType,
        
      }
    ])

    // vider les champs
    setAbsenceTypeValue("")

  }

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
            <div>
              <div className='mb-5'>
                <h1 style={{ color: "#896432" }}>
                
                <FaCalendarAlt style={{ color: '#896432' }} /> Demande de congés
                </h1>
              </div>
              <div className="container " id='cont'>

                <form onSubmit={onSubmitHandler}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="startDate" className=" lb form-label">Date de Début :</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          name="startDate"
                          placeholder="jj/mm/aaaa"
                        />
                        <select
                          className="form-select"
                          name="startPeriod"
                        >
                          <option value="Matin">Matin</option>
                          <option value="Après-midi">Après-midi</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="endDate" className=" lb form-label">Date de Fin :</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="endDate"
                          name="endDate"
                          placeholder="jj/mm/aaaa"
                        />
                        <select
                          className="form-select"
                          name="endPeriod"
                        >
                          <option value="Matin">Matin</option>
                          <option value="Après-midi">Après-midi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="absenceType" className=" lb form-label">Quel type d'absence souhaitez-vous ?</label>
                    <textarea
                      className="form-control"
                      id="absenceType"
                      name="absenceType"
                      // Pour manipuler cet champ
                      value={absenceTypeValue}
                      onChange={(e) => setAbsenceTypeValue(e.target.value)}
                      rows="3"
                    />
                  </div>
                  <button type="submit" className="btn btn-light" style={{backgroundColor:'#896432',color:'white',fontSize:'25px'}}>Envoyer la Demande</button>
                </form>
              </div>
              <div className="row">
                  <div className="table-responsive">

                    <table className="table table-striped table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>date debut</th>
                          <th>Periode debut</th>
                          <th>Date fin</th>
                          <th>Periode fin</th>
                          <th>Demande</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demandeConges.map((demandeConge, i) => (
                          <tr key={i}>
                            <td>
                              {demandeConge.startDate}
                            </td>
                            <td>{demandeConge.startPeriod}</td>
                            <td>{demandeConge.endDate}</td>
                            <td>{demandeConge.endPeriod}</td>
                            <td>{demandeConge.absenceType}</td>
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
  );
}

export default Demande;

import React, { useEffect, useState } from 'react'
import './nav.css';
import {  FaBell, FaUser } from 'react-icons/fa'; // Importation des icônes de la bibliothèque react-icons/fa
import {  Dropdown } from 'react-bootstrap';
import {users} from './db'

function Navba() {

  const [name, setName] = useState("")

  useEffect(() => {
    const allUsers = users.user
    const emailFromLocalStorage = localStorage.getItem("email")

    if(emailFromLocalStorage){
      const currentUser = allUsers.find((user) => user.email === emailFromLocalStorage)

      if(currentUser){
        setName(currentUser.name)
      }
    }

  }, [])

  return (
    <div>
      <section id="content">
        <nav className='d-flex justify-content-end'>

          <span className="">Bienvenue {name}</span>
        
        </nav>
      </section>
    </div>
  )
}

export default Navba

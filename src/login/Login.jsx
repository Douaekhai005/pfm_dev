import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import {users} from './db'

function Login() {
    const utilisateurs = users.user;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    const role = localStorage.getItem('role');
    useEffect(() => {
      switch(role){
        case 'gerant':
          navigate('/home');
          break;
        case 'emploiye':
          navigate('/emploi');
          break;
      }
    }, [role, navigate]);
    
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

       
        const user = utilisateurs.find(userItem => userItem.email === email && userItem.password === password);
        
        if (user) {
            localStorage.setItem('email', user.email);
            localStorage.setItem('role', user.role);
            if (user.role === 'gerant') {
                navigate('/home');
            } else if (user.role === 'emploiye') {
                navigate('/emploi');
            }
        } else {
            setErrors({ email: 'Email ou mot de passe incorrect.' });
        }
    };

    console.log(users)

    return (
        <div>
            <div><img className="imag1" src="./images/back.png" alt="" /></div>
            <div className="container-fluid">
                <form className="mx-auto" onSubmit={onSubmit} id='formlog' >
                    <div className="logo-container">
                        <img className="logo" src="./images/logo.png" alt="Logo" />
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label">Email</label>
                        <input type="email" className=" inpute form-control"  name="email" required />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className=" inpute form-control" name="password" required />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-5" id='btlog'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

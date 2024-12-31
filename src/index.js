
import React from 'react';
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Routage from './pages/Routage';

import { createRoot } from 'react-dom/client';
// new version 
const root = createRoot(document.getElementById('root'));
root.render(<Routage />);

// ReactDOM.render(
//   <React.StrictMode>
//     <Routage/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

reportWebVitals();

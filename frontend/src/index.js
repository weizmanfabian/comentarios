import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';

//Importamos bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//before
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//after
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
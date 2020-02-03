import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'

function Navigation() {
  return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  );
}

export default Navigation;

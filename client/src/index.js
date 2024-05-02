import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import ContextState from './context/ContextState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextState>
      <App />
    </ContextState>
  </React.StrictMode>
);
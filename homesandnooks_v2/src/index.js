import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import userService from './services/userService'

const renderApp = ()  => ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// renderApp();

userService.initKeyCloak(renderApp);





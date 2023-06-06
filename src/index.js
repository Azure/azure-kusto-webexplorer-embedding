import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MsalProvider } from '@azure/msal-react';
import { AuthComponent, msalInstance } from './auth'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <AuthComponent />
    </MsalProvider>
  </React.StrictMode>
);
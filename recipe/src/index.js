import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import reportWebVitals from './reportWebVitals';
import { RecipeRouter } from './Routes/RecipeRouter';
import { RouterProvider } from 'react-router-dom';
import AuthContextProvider from './Store/AuthContext';
import { ErrorProvider } from './Store/ErrorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <AuthContextProvider>
        <RouterProvider router={RecipeRouter} />
      </AuthContextProvider>
    </ErrorProvider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
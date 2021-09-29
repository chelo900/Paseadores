import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { Provider } from 'react-redux';

import App from './App';
import './index.css'
import store from './store';


ReactDOM.render(
  <Provider store = {store}>
    <React.StrictMode>
      <App />
    </React.StrictMode >
=======
import App from './App';
import './index.css'
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider>
    <React.StrictMode>
      <App />
    </React.StrictMode >,
>>>>>>> 18478f3 (pantalla login agregada y css arreglados)
  </Provider>,
  document.getElementById('root')
);



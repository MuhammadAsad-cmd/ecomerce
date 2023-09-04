import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import store from './components/redux/store/store';
import { Provider as AlertProvider,positions,transitions } from 'react-alert'
import alertTemplate from 'react-alert-template-basic'

let options={
  position:positions.TOP_CENTER,
  transition:transitions.SCALE,
  timeout:4500

}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={alertTemplate} {...options}>

      <App />
      
    </AlertProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


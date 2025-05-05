import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './Store/Store';
import { Provider } from "react-redux"; // Import Provider from react-redux

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>  {/* Provide Redux store */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

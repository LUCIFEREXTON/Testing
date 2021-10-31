import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import reducer from './store/reducer';
import { createStore } from 'redux';
import {Provider} from 'react-redux';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

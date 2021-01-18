import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import { createStore } from 'redux';

import "antd/dist/antd.css";
import "./index.css";
let store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
    , document.getElementById('root'));
serviceWorker.register();